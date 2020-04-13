const searchVideo = require('../util/searchVideo');
const { promisify } = require('util');
const search = promisify(searchVideo);

exports.searchVideos = (req, res, next) => {
  const searchString = req.body.search;

  search(searchString)
    .then((results) => {
      res.json({ message: 'finished', info: results });
    })
    .catch((error) => {
      res.status(404).json({ message: 'Not Found', error });
    });
};
