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

export function fetchPlates(experimentId, status) {
  return new Promise((resolve, reject) => {
    let plateMaps;
    let params = {
      TableName: table,
      KeyConditionExpression: '#e = :eeee and #s = :ssss',
      ExpressionAttributeNames: {
        '#e': 'experiment',
        '#s': 'status',
      },
      ExpressionAttributeValues: {
        ':eeee': experimentId,
        ':ssss': status,
      },
      ScanIndexForward: false,
      ConsistentRead: false,
      Limit: 1,
    };

    docClient.query(params, function(err, data) {
      if (err) {
        reject(err);
      } else {
        if (data.Items.length > 0) {
          plateMaps = JSON.parse(data.Items[0].plateMaps);
        }
        resolve(plateMaps);
      }
    });
  });
}

export function saveExperimentPlates(experimentName, status, plateMaps) {
  return new Promise((resolve, reject) => {
    let plateMapsToSave = JSON.stringify(plateMaps);

    let params = {
      TableName: table,
      Key: {
        experiment: experimentName,
        status: status,
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
  });
}
