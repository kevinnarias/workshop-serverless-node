const aws = require('aws-sdk');
var bucketPromise = new aws.S3({apiVersion: '2006-03-01'});
var dynamo = new aws.DynamoDB.DocumentClient();

const validatePrimeNumber = function (number) {
    if (number == 0 || number == 1 || number == 4) return false;
	for (let x = 2; x < number / 2; x++) {
		if (number % x == 0) return false;
	}
    return true;
}

const saveFile = function (number, name, bucketName) {
    const numberText = 'Hola, somos ' + name + ' y el número ' + number + ' es primo.';
    var objectParams = {Bucket: bucketName, Key: number + '_file', Body: numberText};
    bucketPromise.putObject(objectParams).promise();
}

const saveInformation = function (tableName, number, isPrime, callback) {
    let payloadDynamo = {
        Item: {
          id: number,
          isPrime: isPrime 
        },
        TableName: tableName
    }
    dynamo.put(payloadDynamo, callback);
}

module.exports.hello = function(event, context, callback) {
    var statusResponse = 200;
    var textResponse = '';
    const requestNumber = event.number;
    const objectName = event.objectName;
    const participantName = event.participantName;
    
    try {
        if (validatePrimeNumber(requestNumber)) {
            saveFile(requestNumber, participantName, objectName);
            saveInformation(objectName + participantName, requestNumber, 'Is Prime', callback);
            textResponse = 'Is prime number';
        } else {
            saveInformation(objectName + participantName, requestNumber, 'Is not Prime', callback);
            textResponse = 'Is not prime number';
            statusResponse = 201;
        }
        
        return {
            statusCode: statusResponse,
            body: JSON.stringify(textResponse),
        };
    } catch(error) {
        return {
            statusCode: 500,
            body: JSON.stringify('Ocurrió un error.'),
        };
    }
}
