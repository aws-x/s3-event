const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const getBucket = ({ Records }) => Records[0].s3.bucket.name;
const getKey = ({ Records }) => Records[0].s3.object.key;

module.exports.handler = async (event) => {
    console.log('event:', JSON.stringify(event));
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    
    const params = {Bucket: getBucket(event), Key: getKey(event)}

    const response = await s3.getObject(params).promise() // await the promise
    
    const fileContent = response.Body.toString('utf-8');        
    console.log('fileContent:', fileContent)
    return {
        message: 'Go Serverless v1.0! Your function executed successfully!',
    };
};
