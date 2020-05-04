const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

const parseArgs = require('minimist');

const args = parseArgs(process.argv.slice(2));
const { port = '8080' } = args;

const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.use('/api', require('./api'));

app.post('/network', (req, res, next) => {
  res.json(req.body);
});

//app.use(express.static(path.join(__dirname, 'public')));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(+port, '0.0.0.0', () => {
  console.log(`Mixing it up on port ${port}`);
});
