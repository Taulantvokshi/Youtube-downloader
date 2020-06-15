const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
require('dotenv').config();
//Location of your ffmpeg
//if you are deploying on elastc beanstalk use the .ebextensions to install the ffmpeg
// this is where ffmpeg is installed on ec2 machine '/usr/local/bin/ffmpeg/ffmpeg-4.2.2-amd64-static/ffmpeg';
const FFmpegPath = '/usr/local/bin/ffmpeg/ffmpeg-4.2.2-amd64-static/ffmpeg';

exports.downloadVideo = (req, res, next) => {
  const searchString = req.body.url;
  const format = req.body.format;

  //---------------- AWS CONFIG
  // const uploadStream = require('../util/aws-upload')
  // const { writeStream, promise } = uploadStream({
  //   Bucket: 'bucketName',
  //   Key: `${req.body.title}.${format}`,
  // });
  //---------------------

  const stream = ytdl(searchString);
  if (format === 'mp4') {
    // Use writeStream variable if you want to upload files on Aws-s3 bucket -> stream.pipe(writeStream)
    // writeStream
    // the uploadStream also returns a promise variable to get the response data after uploading the file
    // promise.then(response => res.json(response))
    stream.pipe(res).on('error', (error) => {
      next(error);
    });
  } else if (format === 'mp3') {
    const proc = new ffmpeg({ source: stream });
    proc.setFfmpegPath(FFmpegPath);
    proc
      .toFormat('mp3')
      .pipe(res)
      .on('error', (error) => {
        next(error);
      });
  }
};
