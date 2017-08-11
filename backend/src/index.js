require('dotenv').config();

const http = require('http');
const mongoose = require('mongoose');
const logger = require('./common/services/logger');
const config = require('./app/config');
const app = require('./app/app');

const server = http.createServer(app);

mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
  logger.info('MongoDB connected');

  server.listen(app.get('port'), '0.0.0.0');
});

mongoose.connection.on('disconnected', () => {
  logger.info('MongoDB disconnected');
});

mongoose.connection.on('error', err => {
  logger.error(`MongoDB error: ${err}`);
});

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `${addr.address}:${addr.port}`;

  logger.info(`Listening on ${bind}`);
  logger.info(`Environment on ${process.env.NODE_ENV}`);
});

server.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = `${typeof port === 'string' ? 'Pipe' : 'Port'} ${app.get('port')}`;

  switch (error.code) {
    case 'EACCES':
      logger.fatal(`${bind} requires elevated privileges`);
      cleanShutDown(1);
      break;

    case 'EADDRINUSE':
      logger.fatal(`${bind} is already in use`);
      cleanShutDown(1);
      break;

    default:
      throw error;
  }
});

process.on('SIGINT', cleanShutDown).on('SIGTERM', cleanShutDown);

try {
  mongoose.connect(process.env.MONGO_URL, config.mongolab.options);
} catch (err) {
  logger.fatal(`Sever initialization failed: ${err.message}`);
}

function cleanShutDown(code = 0) {
  mongoose.connection.close(() => {
    logger.info('Mongoose connection with DB is disconnected through app termination');

    process.exit(code);
  });
}
