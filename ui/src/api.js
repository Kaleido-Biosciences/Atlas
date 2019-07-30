import axios from 'axios';
import AWS from 'aws-sdk';

import { API_URL, DYNAMODB_ACCESS_KEY_ID , DYNAMODB_SECRET_ACCESS_KEY } from './config';

AWS.config.update({
  region: "us-east-1",
  endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
  accessKeyId: DYNAMODB_ACCESS_KEY_ID,
  secretAccessKey: DYNAMODB_SECRET_ACCESS_KEY
});

let docClient = new AWS.DynamoDB.DocumentClient();
let table = "atlas-production";

export function fetchExperiments(page, size, nameContains, descContains) {
  let queryString = '';
  if (page || size || nameContains || descContains) {
    const params = [];
    if (page) params.push(`page=${page}`);
    if (size) params.push(`size=${size}`);
    if (nameContains) params.push(`name.contains=${nameContains}`);
    if (descContains) params.push(`description.contains=${descContains}`);
    queryString += '?' + params.join('&');
  }
  return axios.get(API_URL + '/experiments' + queryString);
}

export function fetchComponents(page, size, nameContains, descContains) {
  let queryString = '';
  if (page || size || nameContains || descContains) {
    const params = [];
    if (page) params.push(`page=${page}`);
    if (size) params.push(`size=${size}`);
    if (nameContains) params.push(`name.contains=${nameContains}`);
    if (descContains) params.push(`description.contains=${descContains}`);
    queryString += '?' + params.join('&');
  }
  const communities = axios.get(API_URL + '/communities' + queryString);
  const compounds = axios.get(API_URL + '/batches' + queryString);
  const media = axios.get(API_URL + '/media' + queryString);
  const supplements = axios.get(API_URL + '/supplements' + queryString);
  return Promise.all([communities, compounds, media, supplements]).then(
    response => {
      return {
        communities: response[0].data,
        compounds: response[1].data,
        media: response[2].data,
        supplements: response[3].data,
      };
    }
  );
}

export function fetchPlateMaps(experimentId) {
  return new Promise((resolve, reject) => {
    let plateMaps;
    let params = {
      TableName: table,
      KeyConditionExpression: "#e = :eeee",
      ExpressionAttributeNames: {
        "#e": "experiment"
      },
      ExpressionAttributeValues: {
        ":eeee": experimentId
      },
      ScanIndexForward: false,
      ConsistentRead: false,
      Limit: 1,
    };

    docClient.query(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        if (data.Items.length > 0) {
          plateMaps = data.Items[0].plateMaps;
        }
        resolve(plateMaps);
      }
    });
   });
}

// https://itsolutionstuff.com/post/how-to-remove-empty-and-null-values-from-json-object-in-jqueryexample.html
const removeEmptyOrNull = (obj) => {
  Object.keys(obj).forEach(k =>
    (obj[k] && typeof obj[k] === 'object') && removeEmptyOrNull(obj[k]) ||
    (!obj[k] && obj[k] !== undefined) && delete obj[k]
  );
  return obj;
};

export function saveExperimentPlateMaps(experimentId, status, plateMaps) {
  return new Promise((resolve, reject) => {
    // clone plateMaps and remove any null and empty string before saving
    let plateMapsToSave = removeEmptyOrNull(JSON.parse(JSON.stringify(plateMaps)));

    let params = {
      TableName:table,
      Key:{
        "experiment": experimentId,
        "status": status,
      },
      UpdateExpression: "set plateMaps=:p",
      ExpressionAttributeValues:{
        ":p": plateMapsToSave,
      },
      ReturnValues:"UPDATED_NEW"
    };


    docClient.update(params, function(err, data) {
      if (err) {
        reject(err);
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
        resolve({ experimentId, status, plateMaps } );
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
      }
    });
  });
}
