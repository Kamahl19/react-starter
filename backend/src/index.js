'use strict';

require('dotenv').config();

const http = require('http');
const logger = require('./common/services/logger');
const app = require('./app/app');
const db = require('./app/db');

const server = http.createServer(app);

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

db.init({
  onConnected: () => {
    server.listen(app.get('port'), '0.0.0.0');
  },
});

try {
  db.connect();
} catch (err) {
  logger.fatal(`Sever initialization failed: ${err.message}`);
}

function cleanShutDown(code = 0) {
  db.closeConnection(() => {
    logger.info('DB connection is closed through app termination');
    process.exit(code);
  });
}
