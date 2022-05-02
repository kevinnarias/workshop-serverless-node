'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.plus = (event, context, callback) => {
    dynamoDb.put(createDynamoDBPayload(event), callback);
};

function createDynamoDBPayload(event)  {
    const data = JSON.parse(event.body);
    data.id = uuid.v4();
    return {
        TableName : process.env.TABLE_NAME,
        Item: data,
    };
}