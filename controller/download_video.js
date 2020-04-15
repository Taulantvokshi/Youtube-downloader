const ytdl = require('ytdl-core');
const uploadStream = require('../util/aws-upload');
const ffmpeg = require('fluent-ffmpeg');
// const FFmpegPath =
//   process.env.ffmpegPath ||
//   '/usr/local/bin/ffmpeg/ffmpeg-4.2.2-amd64-static/ffmpeg';
exports.downloadVideo = (req, res, next) => {
  const searchString = req.body.url;
  const title = req.body.title;
  const format = req.body.format;
  const videoId = ytdl.getURLVideoID(searchString);

  const { writeStream, promise } = uploadStream({
    Bucket: 'youtube-converter-mp3-mp4',
    Key: `${req.body.title}.${format}`,
  });

  if (!ytdl.validateID(videoId)) {
    res.status(404).json({ messge: 'Not a valid URL!' });
  } else {
    const stream = ytdl(searchString);
    if (format === 'mp4') {
      stream.pipe(writeStream);
      promise
        .then((results) => {
          res.json({
            posted: true,
            title,
            response: results,
          });
        })
        .catch((error) => {
          res.status(422).json({ message: 'Unprocessable Entity', error });
        });
    } else if (format === 'mp3') {
      const proc = new ffmpeg({ source: stream });
      proc.setFfmpegPath(
        '/usr/local/bin/ffmpeg/ffmpeg-4.2.2-amd64-static/ffmpeg'
      );
      proc.toFormat('mp3').pipe(writeStream);
      promise
        .then((mp3Results) => {
          res.json({
            posted: true,
            title,
            response: mp3Results,
          });
        })
        .catch((error) => {
          res.status(422).json({ message: 'Unprocessable Entity', error });
        });
    }
  }
};
