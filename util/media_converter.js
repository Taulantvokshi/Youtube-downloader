const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

// /usr/local/Cellar/ffmpeg/
//usr/local/Cellar/ffmpeg/4.2.2_2/bin/

const mediaConverter = (filePath, callback) => {
  ffmpeg.setFfmpegPath('ffmpeg');
  return ffmpeg(`public/upload/${filePath}.mp4`)
    .fromFormat('mp4')
    .toFormat('mp3')
    .pipe(fs.createWriteStream(`public/upload/${filePath}.mp3`))
    .on('finish', (results) => {
      callback(null, results);
    })
    .on('error', (error) => {
      callback(error);
    });
};

module.exports = mediaConverter;
