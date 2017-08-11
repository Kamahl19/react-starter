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

// Set port
app.set('port', normalizePort(process.env.PORT));

// Log requests to the console
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Parse body params and attach them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Gzip
app.use(compression());

// Allow CORS
if (config.cors.origin) {
  const cors = require('cors');
  app.use(cors(config.cors));
}

// Secure app by setting various HTTP headers
app.use(helmet());

// Serve frontend app
app.use(
  '/',
  express.static(path.resolve(__dirname, '..', '..', 'public'), {
    maxAge: config.cacheFilesFor,
  })
);

app.use('/api', routes);

// Error handlers
app.use(requestValidationErrorHandler);
app.use(catch404handler);
app.use(errorHandler);

module.exports = app;
