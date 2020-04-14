const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const uploadStream = require('../util/aws-upload');

// /usr/local/Cellar/ffmpeg/
//usr/local/Cellar/ffmpeg/4.2.2_2/bin/

const mediaConverter = (filePath, fileName, callback) => {
  const exactFileName = fileName.slice(0, fileName.length - 4);
  const { writeStream, promise } = uploadStream({
    Bucket: 'youtube-converter-mp3-mp4',
    Key: `${exactFileName}.mp3`,
  });
  ffmpeg.setFfmpegPath(
    '/app/tmp/buildpacks/bin/ffmpg/',
  ffmpeg(filePath)
    .fromFormat('mp4')
    .toFormat('mp3')

    .pipe(writeStream);
  promise
    .then((results) => {
      callback(null, results);
    })
    .catch((error) => {
      callback(error);
    });
};

module.exports = mediaConverter;
