import AWS from 'aws-sdk'; // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export function get(params) {
  return new Promise((resolve, reject) => dynamoDb
    .get(params)
    .promise()
    .then((data) => resolve(data.Item))
    .catch((err) => reject(err)));
}

export function query(params) {
  return new Promise((resolve, reject) => dynamoDb
    .query(params)
    .promise()
    .then((data) => resolve(data.Items))
    .catch((err) => reject(err)));
}

export function scan(params) {
  return new Promise((resolve, reject) => dynamoDb
    .scan(params)
    .promise()
    .then((data) => resolve(data.Items))
    .catch((err) => reject(err)));
}

export function createItem(params) {
  return putItem(params);
}

export function updateItem(params, args) {
  return new Promise((resolve, reject) => dynamoDb
    .update(params)
    .promise()
    .then(() => resolve(args))
    .catch((err) => reject(err)));
}

export function putItem(params) {
  return new Promise((resolve, reject) => dynamoDb
    .put(params)
    .promise()
    .then(() => resolve(params.Item))
    .catch((err) => reject(err)));
}

export function deleteItem(params, args) {
  return new Promise((resolve, reject) => dynamoDb
    .delete(params)
    .promise()
    .then(() => resolve(args))
    .catch((err) => reject(err)));
}
