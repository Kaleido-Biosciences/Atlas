import AWS from 'aws-sdk';
import axios from 'axios';
import pako from 'pako';
import lzutf8 from 'lzutf8';
import { COMPONENT_TYPE_ATTRIBUTE } from 'KaptureApp/config/componentTypes';
import { STATUS_COMPLETED, STATUS_DRAFT } from 'KaptureApp/config/constants';
import {
  DYNAMODB_ACCESS_KEY_ID,
  DYNAMODB_SECRET_ACCESS_KEY,
  DYNAMODB_TABLE,
} from 'KaptureApp/config/api';

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
  accessKeyId: DYNAMODB_ACCESS_KEY_ID,
  secretAccessKey: DYNAMODB_SECRET_ACCESS_KEY,
});

let docClient = new AWS.DynamoDB.DocumentClient();
let table = DYNAMODB_TABLE;

export async function fetchActivityVersions(experimentId) {
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

/**
 * Saves the current container set as a DRAFT with version 0 in Dyanamo database
 * @param {String} activityName name of the activity to which the containers are associated
 * @param {Object[]} containers Set of containers associated with the experiment
 * @returns {Promise<any>}
 */
export function saveActivityGrids(activityName, grids) {
  return new Promise((resolve, reject) => {
    const compressedGrids = compressGrids(grids);
    saveToDB(activityName, STATUS_DRAFT, 0, compressedGrids, reject, resolve);
  });
}

/**
 * Duplicates the current plate and saves it as a COMPLETED with version set to the current epoch time in Dyanamo database
 * @param {String} experimentName name of the experiment to which the plates are associated
 * @param {Object[]} plateMaps Set of plates associated with the experiment
 * @returns {Promise<any>}
 */
export function publishActivityGrids(activityName, grids) {
  return new Promise((resolve, reject) => {
    const compressedGrids = compressGrids(grids);
    getUTCTime().then(function (time) {
      createNew(
        activityName,
        STATUS_COMPLETED,
        time,
        compressedGrids,
        reject,
        ({ data }) => {
          resolve({
            containerCollectionDetails: {
              status: activityName + '_' + STATUS_COMPLETED,
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
      .then(function (response) {
        resolve(response.data['currentFileTime']);
      })
      .catch(function (error) {
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

  docClient.update(params, function (err, data) {
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
  docClient.put(params, function (err, data) {
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
        data.Items.forEach(function (item) {
          const { plateMaps, ...rest } = item;
          experiments.push({
            plateMaps: decompressGrids(plateMaps),
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

function compressGrids(grids) {
  const gridsString = JSON.stringify(grids);
  const gzipped = pako.gzip(gridsString, { to: 'string' });
  return btoa(gzipped);
}

function decompressGrids(compressedGrids) {
  const decoded = atob(compressedGrids);
  const decompressed = pako.ungzip(decoded, { to: 'string' });
  return JSON.parse(decompressed);
}

function processResponse(response) {
  const versions = [];
  if (response.Count > 0) {
    response.Items.forEach(({ plateMaps, ...rest }) => {
      const data = JSON.parse(
        lzutf8.decompress(plateMaps, {
          inputEncoding: 'Base64',
        })
      );
      versions.push({
        plateMaps: convertOldToNew(data),
        ...rest,
      });
    });
  }
  return versions;
}

function convertOldToNew(oldPlatemaps) {
  const newPlatemaps = oldPlatemaps.map((oldPlatemap, i) => {
    const newPlatemap = {};
    newPlatemap.id = oldPlatemap.id;
    newPlatemap.rows = oldPlatemap.data.length;
    newPlatemap.columns = oldPlatemap.data[0].length;
    newPlatemap.name = `Plate ${i + 1}`;
    newPlatemap.containerType = 'Plate';
    newPlatemap.barcode = oldPlatemap.barcode;
    const oldPlatemapData = oldPlatemap.data.flat();
    newPlatemap.data = oldPlatemapData.map((well) => {
      const wellComponents = well.components.map(({ type, ...rest }) => {
        return {
          ...rest,
          type: type.charAt(0).toUpperCase() + type.slice(1),
        };
      });
      const components = [],
        attributes = [];
      wellComponents.forEach((component) => {
        if (component.type === COMPONENT_TYPE_ATTRIBUTE) {
          const { id, name, ...rest } = component.attributeValues;
          attributes.push({
            ...rest,
          });
        } else {
          components.push(component);
        }
      });
      return {
        name: null,
        containerType: 'PlateWell',
        row: well.id.charAt(0),
        col: parseInt(well.id.slice(1)),
        barcode: null,
        components,
        attributes,
      };
    });
    return newPlatemap;
  });
  return newPlatemaps;
}

// function processResponse(response) {
//   const versions = [];
//   if (response.Count > 0) {
//     response.Items.forEach(({ plateMaps, ...rest }) => {
//       versions.push({
//         plateMaps: decompressGrids(plateMaps),
//         ...rest,
//       });
//     });
//   }
//   return versions;
// }
