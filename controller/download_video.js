//Node
const fs = require('fs');
const { promisify } = require('util');

//npm
const ytdl = require('ytdl-core');
const mediaConverter = require('../util/media_converter');
const uploadStream = require('../util/aws-upload');
//Promisify
const converter = promisify(mediaConverter);

//
exports.downloadVideo = (req, res, next) => {
  const { writeStream, promise } = uploadStream({
    Bucket: 'youtube-converter-mp3-mp4',
    Key: `${req.body.title}.mp4`,
  });

  const searchString = req.body.url;
  const title = req.body.title;
  const format = req.body.format;
  const videoId = ytdl.getURLVideoID(searchString);

  if (!ytdl.validateID(videoId)) {
    res.status(404).json({ messge: 'Not a valid URL!' });
  } else {
    ytdl(searchString, {
      //filter: (format) => format.container === 'mp4',
    })
      .pipe(writeStream)
      .on('finish', () => {
        promise.then((results) => {
          if (format === 'mp3') {
            converter(results.Location, results.Key)
              .then((mp3res) => {
                res.json({ posted: true, title, response: mp3res });
              })
              .catch((error) => {
                throw new Error(error);
              });
          } else {
            res.json({ posted: true, title, response: results });
          }
        });
      })
      .on('error', (error) => {
        console.log(error, 'op');
        throw new Error(error);
      });
  }
};
