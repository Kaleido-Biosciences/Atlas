import AWS from 'aws-sdk';
import lzutf8 from 'lzutf8';
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

const docClient = new AWS.DynamoDB.DocumentClient();

export async function fetchActivityData(activityId) {
  const params = {
    TableName: DYNAMODB_TABLE,
    KeyConditionExpression: '#e = :e',
    ExpressionAttributeNames: {
      '#e': 'activityId',
    },
    ExpressionAttributeValues: {
      ':e': activityId,
    },
  };
  const response = await docClient.query(params).promise();
  if (response.Count > 0) {
    return processItem(response.Items[0]);
  } else return null;
}

export async function createActivityData(data) {
  const grids = compressGrids(data.grids);
  const params = {
    TableName: DYNAMODB_TABLE,
    Item: {
      ...data,
      grids,
    },
  };
  const response = await docClient.put(params).promise();
  return response;
}

export async function updateActivityData(activityId, grids, views) {
  const params = {
    TableName: DYNAMODB_TABLE,
    Key: {
      activityId,
    },
    UpdateExpression: 'set grids=:g, #v=:v, updatedTime=:u',
    ExpressionAttributeNames: {
      '#v': 'views',
    },
    ExpressionAttributeValues: {
      ':g': compressGrids(grids),
      ':v': views,
      ':u': Date.now(),
    },
    ReturnValues: 'UPDATED_NEW',
  };
  const response = await docClient.update(params).promise();
  return response;
}

function processItem(item) {
  const grids = JSON.parse(
    lzutf8.decompress(item.grids, {
      inputEncoding: 'Base64',
    })
  );
  return {
    ...item,
    grids,
  };
}

function compressGrids(grids) {
  return lzutf8.compress(JSON.stringify(grids), {
    outputEncoding: 'Base64',
  });
}
