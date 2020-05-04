const router = require('express').Router();
const path = require('path');
const { downloadVideo } = require('../controller/download_video');
const { searchVideos } = require('../controller/search_videos');

router.post('/search_videos', searchVideos);
router.post('/download_video', downloadVideo);

router.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

module.exports = router;
