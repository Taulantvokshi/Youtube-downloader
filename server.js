const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;

const { downloadVideo } = require('./controller/download_video');
const { searchVideos } = require('./controller/search_videos');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//Dowload video
app.post('/search_videos', searchVideos);
app.post('/download_video', downloadVideo);
//app.post('/remove_download', removeDownload);

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'upload')));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log('server is running');
});
