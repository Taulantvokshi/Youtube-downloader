const ytsr = require('ytsr');

const searchVideo = (search, callback) => {
  let filter;
  ytsr.getFilters(search, function (err, filters) {
    if (err) throw err;
    filter = filters.get('Type').find((o) => o.name === 'Video');
    ytsr.getFilters(filter.ref, function (err, filters) {
      if (err) throw err;
      //filters.get('Duration').find((o) => o.name.startsWith('Short'));
      var options = {
        limit: 10,
        nextpageRef: filter.ref,
      };
      ytsr(null, options, function (err, searchResults) {
        if (err) {
          callback(err);
        } else {
          callback(null, searchResults);
        }
      });
    });
  });
};

module.exports = searchVideo;
