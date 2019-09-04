import AWS from 'aws-sdk';

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
    let version = 0;
    if (status === completedStatus){
      var p1 = readCompletedItem(experimentName);
      p1.then(function(count){
        saveToDB(experimentName, status,count + 1, plateMapsToSave, reject, resolve);
      });
    }
    else{
      saveToDB(experimentName, status, version, plateMapsToSave, reject, resolve);
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

function readCompletedItem(experimentName) {
  return new Promise(function(resolve, reject) {
    var params = {
      TableName : table,
      KeyConditionExpression: "#e = :eeee",
      ExpressionAttributeNames:{
        "#e": "experiment_status"
      },
      ExpressionAttributeValues: {
        ":eeee": experimentName+"_"+completedStatus
      }
    };
    docClient.query(params, function (err, data) {
      if (err) {
        resolve(0);
      } else {
        resolve(data['Count']);
      }
    });
  });
}