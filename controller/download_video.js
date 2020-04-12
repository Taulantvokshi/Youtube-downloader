const fs = require('fs');
const ytdl = require('ytdl-core');
// const youtubeParser = require('../util/get_video_id');
const { promisify } = require('util');
const searchVideo = require('../util/searchVideo');
const mediaConverter = require('../util/media_converter');

//Converet callback to promisess
const search = promisify(searchVideo);
const unlink = promisify(fs.unlink);
const converter = promisify(mediaConverter);

// converter('pUjE9H8QlA4')
//   .then((results) => {
//     console.log('success', results);
//   })
//   .catch((error) => {
//     console.log('error');
//     throw new Error(error);
//   })

exports.searchVideos = (req, res, next) => {
  const searchString = req.body.search;
  search(searchString)
    .then((results) => {
      res.json({ message: 'finished', info: results });
    })
    .catch((error) => {
      res.status(404).json({ message: 'Not Found' });
      throw new Error(error);
    });
};

exports.downloadVideo = (req, res, next) => {
  const searchString = req.body.url;
  const title = req.body.title;
  const videoId = ytdl.getURLVideoID(searchString);

  if (!ytdl.validateID(videoId)) {
    res.status(404).json({ messge: 'Not a valid URL!' });
  } else {
    ytdl(searchString, {
      filter: (format) => format.container === 'mp4',
    })
      .pipe(fs.createWriteStream(`public/upload/${title}.mp4`))
      .on('finish', () => {
        res.json({ posted: true, title });
      });
  }
};

exports.removeDownload = (req, res) => {
  const id = req.body.url;
  unlink(`./public/upload/${id}.mp4`).then(() => {
    res.status(200).send({ message: 'success' });
  });
};
