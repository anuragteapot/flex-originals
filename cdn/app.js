const express = require('express');
const favicon = require('serve-favicon');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
// const mongoose = require('mongoose');

const app = express();

const cdn = require('./cdn');
app.get('/videoplayback', cdn.serveVideo);
app.get('/audioplayback', cdn.serveVideo);
app.get('/f.img', cdn.serveImage);

app.use(compression());
app.use(cors());
app.use(morgan('dev'));
app.use(
  bodyParser.json({
    limit: '500mb',
  }),
);
app.use(
  bodyParser.urlencoded({
    limit: '500mb',
    extended: true,
  }),
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET');
    return res.status(200).json({});
  }
  next();
});

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
  next();
});

module.exports = app;
