import AWS from 'aws-sdk';
import axios from 'axios';

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
let completedStatus = 'COMPLETED';
let WORLD_CLOCK_URL = 'http://worldclockapi.com/api/json/utc/now';

export function fetchPlates(experimentId, status) {
  return new Promise((resolve, reject) => {
    let plateMaps;
    let params = {
      TableName: table,
      KeyConditionExpression: '#e = :eeee and #s = :ssss',
      ExpressionAttributeNames: {
        '#e': 'experiment_status',
        '#s': 'version',
      },
      ExpressionAttributeValues: {
        ':eeee': experimentId+"_"+status,
        ':ssss': 0,
      },
      ScanIndexForward: false,
      ConsistentRead: false,
    };

    docClient.query(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        if (data.Items.length > 0) {
          plateMaps = JSON.parse(data.Items[data.Items.length - 1].plateMaps);
        }
        resolve(plateMaps);
      }
    });
  });
}

export function saveExperimentPlates(experimentName, status, plateMaps) {
  return new Promise((resolve, reject) => {
    let plateMapsToSave = JSON.stringify(plateMaps);
    if (status === completedStatus) {
      axios.get(WORLD_CLOCK_URL).then(function (time) {
        createNew(experimentName, status, time.data['currentFileTime'], plateMapsToSave, reject, resolve);
      });
    }
    else{
      saveToDB(experimentName, status, 0, plateMapsToSave, reject, resolve);
    }
  });
}

function saveToDB(experimentName, status, version, plateMapsToSave, reject, resolve) {
  let params = {
    TableName: table,
    Key: {
      experiment_status: experimentName + "_" + status,
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
      resolve({data});
    }
  });
}

function createNew(experimentName, status, version, plateMapsToSave, reject, resolve) {
  var params = {
    TableName : table,
    Item:{
      experiment_status: experimentName + "_" + status,
      version: version,
      plateMaps: plateMapsToSave
    }
  };
  docClient.put(params, function(err, data) {
    if (err) {
      reject(err);
      console.error(
          'Unable to update item. Error JSON:',
          JSON.stringify(err, null, 2)
      );
    } else {
      resolve({data});
    }
  });
}