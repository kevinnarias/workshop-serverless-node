const headers = { 'Content-Type':'application/json' }

function generateResponse(responseBody, key = 'response', statusCode = 200 ){
    console.log(responseBody)
    return {
        statusCode: statusCode,
        body: JSON.stringify(
            { [key]: responseBody},
        ),
        headers: headers
        
    }
}

module.exports = { generateResponse }