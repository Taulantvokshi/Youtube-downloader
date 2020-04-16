const ytsr = require('ytsr');

const searchVideo = (search, callback) => {
  let filter;
  ytsr.getFilters(search, function (err, filters) {
    if (err) throw err;
    filter = filters.get('Type').find((o) => o.name === 'Video');
    ytsr.getFilters(filter.ref, function (err, filters) {
      if (err) throw err;
      //filter = filters.get('Duration').find((o) => o.name.startsWith('Short'));
      var options = {
        limit: 10,
        nextpageRef: filter.ref,
      };
      ytsr(null, options, function (error, searchResults) {
        if (error) {
          callback(error);
        } else {
          searchResults.items = searchResults.items.filter((item) => {
            if (item.duration) {
              const duration = item.duration.split(':');
              if (duration.length <= 2) {
                return Number(duration[0]) < 7.0;
              }
            }
          });
          callback(null, searchResults);
        }
      });
    });
  });
};

module.exports = searchVideo;
