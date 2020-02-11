import AWS from 'aws-sdk';
import axios from 'axios';
import lzutf8 from 'lzutf8';
import { STATUS_COMPLETED, STATUS_DRAFT } from '../../../constants';
import {
  DYNAMODB_ACCESS_KEY_ID,
  DYNAMODB_SECRET_ACCESS_KEY,
  DYNAMODB_TABLE,
} from '../config';

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
  accessKeyId: DYNAMODB_ACCESS_KEY_ID,
  secretAccessKey: DYNAMODB_SECRET_ACCESS_KEY,
});

let docClient = new AWS.DynamoDB.DocumentClient();
let table = DYNAMODB_TABLE;

const processResponse = response => {
  const versions = [];
  if (response.Count > 0) {
    response.Items.forEach(({ plateMaps, ...rest }) => {
      versions.push({
        plateMaps: JSON.parse(
          lzutf8.decompress(plateMaps, {
            inputEncoding: 'Base64',
          })
        ),
        ...rest,
      });
    });
  }
  return versions;
};

export async function fetchExperimentVersions(experimentId) {
  let versions = [];
  const params = {
    TableName: table,
    KeyConditionExpression: '#e = :e',
    ExpressionAttributeNames: {
      '#e': 'experiment_status',
    },
    ScanIndexForward: false,
    ConsistentRead: false,
  };
  const draftParams = Object.assign({}, params, {
    ExpressionAttributeValues: {
      ':e': `${experimentId}_DRAFT`,
    },
  });
  const completedParams = Object.assign({}, params, {
    ExpressionAttributeValues: {
      ':e': `${experimentId}_COMPLETED`,
    },
  });
  const draftResponse = await docClient.query(draftParams).promise();
  versions = versions.concat(processResponse(draftResponse));
  const completedResponse = await docClient.query(completedParams).promise();
  versions = versions.concat(processResponse(completedResponse));
  return versions;
}

export async function fetchVersion(status, timestamp) {
  const params = {
    TableName: table,
    KeyConditionExpression: '#e = :e and #v = :v',
    ExpressionAttributeNames: {
      '#e': 'experiment_status',
      '#v': 'version',
    },
    ExpressionAttributeValues: {
      ':e': status,
      ':v': parseInt(timestamp),
    },
    ScanIndexForward: false,
    ConsistentRead: false,
  };
  const response = await docClient.query(params).promise();
  const versions = processResponse(response);
  if (versions.length) {
    return versions[0];
  }
}

export function fetchPlates(experimentId, status) {
  return new Promise((resolve, reject) => {
    let plateMaps = [];
    let params = {
      TableName: table,
      KeyConditionExpression: '#e = :eeee and #s = :ssss',
      ExpressionAttributeNames: {
        '#e': 'experiment_status',
        '#s': 'version',
      },
      ExpressionAttributeValues: {
        ':eeee': experimentId + '_' + status,
        ':ssss': 0,
      },
      ScanIndexForward: false,
      ConsistentRead: false,
    };
    docClient.query(params, function(err, response) {
      if (err) {
        reject(err);
      } else {
        if (response.Count > 0) {
          plateMaps = JSON.parse(
            lzutf8.decompress(response.Items[0].plateMaps, {
              inputEncoding: 'Base64',
            })
          );
        }
        resolve(plateMaps);
      }
    });
  });
}

/**
 * Saves the current plate set as a DRAFT with version 0 in Dyanamo database
 * @param {String} experimentName name of the experiment to which the plates are associated
 * @param {Object[]} plateMaps Set of plates associated with the experiment
 * @returns {Promise<any>}
 */
export function saveExperimentPlates(experimentName, plateMaps) {
  return new Promise((resolve, reject) => {
    let plateMapsToSave = lzutf8.compress(JSON.stringify(plateMaps), {
      outputEncoding: 'Base64',
    });
    saveToDB(experimentName, STATUS_DRAFT, 0, plateMapsToSave, reject, resolve);
  });
}

/**
 * Duplicates the current plate and saves it as a COMPLETED with version set to the current epoch time in Dyanamo database
 * @param {String} experimentName name of the experiment to which the plates are associated
 * @param {Object[]} plateMaps Set of plates associated with the experiment
 * @returns {Promise<any>}
 */
export function publishExperimentPlates(experimentName, plateMaps) {
  return new Promise((resolve, reject) => {
    let plateMapsToSave = lzutf8.compress(JSON.stringify(plateMaps), {
      outputEncoding: 'Base64',
    });
    getUTCTime().then(function(time) {
      createNew(
        experimentName,
        STATUS_COMPLETED,
        time,
        plateMapsToSave,
        reject,
        ({ data }) => {
          resolve({
            containerCollectionDetails: {
              status: experimentName + '_' + STATUS_COMPLETED,
              version: time,
              data,
            },
          });
        }
      );
    });
  });
}

/**
 * This function uses the following api to retrieve a LDAP/Win32 FILETIME time
 * https://rapidapi.com/theapiguy/api/world-clock
 * @returns {Promise<any>}
 */
export function getUTCTime() {
  let WORLD_CLOCK_SITE = 'world-clock.p.rapidapi.com';
  let WORLD_CLOCK_URL = 'https://world-clock.p.rapidapi.com/json/utc/now';
  let WORLD_CLOCK_KEY = '16adfed3e9msh71bdb95d05818cap103220jsn7319172ab565';

  return new Promise((resolve, reject) => {
    axios
      .get(WORLD_CLOCK_URL, {
        headers: {
          'x-rapidapi-host': WORLD_CLOCK_SITE,
          'x-rapidapi-key': WORLD_CLOCK_KEY,
        },
      })
      .then(function(response) {
        resolve(response.data['currentFileTime']);
      })
      .catch(function(error) {
        // convert unix time stamp to LDAP/Win32 Filetime
        resolve((Date.now() / 1000 + 11644473600) * 10000000);
      });
  });
}

function saveToDB(
  experimentName,
  status,
  version,
  plateMapsToSave,
  reject,
  resolve
) {
  let params = {
    TableName: table,
    Key: {
      experiment_status: experimentName + '_' + status,
      version: version,
    },
    UpdateExpression: 'set plateMaps=:p',
    ExpressionAttributeValues: {
      ':p': plateMapsToSave,
    },
    ReturnValues: 'UPDATED_NEW',
  };

  docClient.update(params, function(err, data) {
    if (err) {
      reject(err);
      console.error(
        'Unable to update item. Error JSON:',
        JSON.stringify(err, null, 2)
      );
    } else {
      resolve({ data });
    }
  });
}

function createNew(
  experimentName,
  status,
  version,
  plateMapsToSave,
  reject,
  resolve
) {
  var params = {
    TableName: table,
    Item: {
      experiment_status: experimentName + '_' + status,
      version: version,
      plateMaps: plateMapsToSave,
    },
  };
  docClient.put(params, function(err, data) {
    if (err) {
      reject(err);
      console.error(
        'Unable to update item. Error JSON:',
        JSON.stringify(err, null, 2)
      );
    } else {
      resolve({ data });
    }
  });
}

export function scanTable() {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: 'atlas-production2',
    };
    const experiments = [];
    docClient.scan(params, onScan);

    function onScan(err, data) {
      if (err) {
        console.error(
          'Unable to scan the table. Error JSON:',
          JSON.stringify(err, null, 2)
        );
      } else {
        data.Items.forEach(function(item) {
          const { plateMaps, ...rest } = item;
          experiments.push({
            plateMaps: JSON.parse(
              lzutf8.decompress(plateMaps, {
                inputEncoding: 'Base64',
              })
            ),
            ...rest,
          });
        });
        if (typeof data.LastEvaluatedKey != 'undefined') {
          params.ExclusiveStartKey = data.LastEvaluatedKey;
          docClient.scan(params, onScan);
        } else {
          resolve(experiments);
        }
      }
    }
  });
}
