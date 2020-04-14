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
    '/app/tmp/buildpacks/17942be262d9aab972d360c2ca93b45c9bf573d42825506b9d54baa47b2c145501307cfa4b7f51ca1d1f45f75acb698a808a6b2b207420a64bcc6fc59e419199/bin/'
  );
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
