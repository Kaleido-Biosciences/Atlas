import AWS from 'aws-sdk';
import axios from 'axios';
import lzutf8 from 'lzutf8';
import { STATUS_COMPLETED } from '../constants';
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

export function saveExperimentPlates(experimentName, status, plateMaps) {
  return new Promise((resolve, reject) => {
    let plateMapsToSave = lzutf8.compress(JSON.stringify(plateMaps), {
      outputEncoding: 'Base64',
    });
      saveToDB(experimentName, status, 0, plateMapsToSave, reject, resolve);
  });
}

export function publishExperimentPlates(experimentName, status, plateMaps) {
  return new Promise((resolve, reject) => {
    let plateMapsToSave = lzutf8.compress(JSON.stringify(plateMaps), {
      outputEncoding: 'Base64',
    });
    if (status === STATUS_COMPLETED) {
      getUTCTime().then(function(time) {
        createNew(
          experimentName,
          status,
          time,
          plateMapsToSave,
          reject,
          resolve
        );
      });
    } else {
        console.error(
            'Experiment should be completed to be published:',
            JSON.stringify(status, null, 2)
        );
    }
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
            plateMaps: JSON.parse(lzutf8.decompress(plateMaps, {
              inputEncoding: 'Base64',
            })),
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
