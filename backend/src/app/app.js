const express = require('express');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const httpStatus = require('http-status');
const routes = require('src/app/routes');
const config = require('src/app/config');
const { logger } = require('src/common/services');
const { normalizePort, getErrorMessage } = require('src/common/utils/helpers');
const { NotFoundError, BadRequestError } = require('src/common/utils/apiErrors');

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

// Routes
app.use('/api', routes);

// Params/Body/Headers/Query Validation
app.use((err, req, res, next) => {
  if (err.isJoi) {
    return next(new BadRequestError({ message: getErrorMessage(err.details) }));
  }
  return next(err);
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  return next(new NotFoundError('Not Found'));
});

// Error middleware
app.use((err, req, res, next) => {
  logger.error(err);

  res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR);

  res.json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

module.exports = app;
