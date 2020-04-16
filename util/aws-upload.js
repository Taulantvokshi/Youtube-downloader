const aws = require('aws-sdk');
const stream = require('stream');

const uploadStream = ({ Bucket, Key }) => {
  aws.config.update({
    secretAccessKey: '//',
    accessKeyId: '//',
    region: 'us-east-1',
  });
  const s3 = new aws.S3();
  const pass = new stream.PassThrough();
  return {
    writeStream: pass,
    promise: s3.upload({ Bucket, Key, Body: pass }).promise(),
  };
};

module.exports = uploadStream;
