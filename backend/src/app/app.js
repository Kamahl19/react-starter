'use strict';

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('../app/routes');
const config = require('../app/config');
const { normalizePort } = require('../common/utils/helpers');
const {
  errorHandler,
  catch404handler,
  requestValidationErrorHandler,
} = require('./middleware/errorHandlers');

const app = express();

app.set('port', normalizePort(process.env.PORT));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());

if (config.cors.origin) {
  const cors = require('cors');
  app.use(cors(config.cors));
}

app.use(helmet());

app.use(
  '/',
  express.static(path.resolve(__dirname, '..', '..', 'public'), {
    maxAge: config.cacheFilesFor,
  })
);

app.use('/api', routes);

app.use(requestValidationErrorHandler);
app.use(catch404handler);
app.use(errorHandler);

module.exports = app;
