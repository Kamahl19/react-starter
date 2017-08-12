'use strict';

const bunyan = require('bunyan');
const fs = require('fs');
const path = require('path');
const config = require('../config');

const logDirectory = process.env.LOG_DIR || path.resolve('./logs');

try {
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
} catch (e) {
  console.log(`Cannot create log directory: ${e}`);
}

const logger = bunyan.createLogger({
  name: 'react-starter-backend',
  streams: [
    {
      stream: process.stdout,
    },
    {
      type: 'rotating-file',
      path: logDirectory + '/logs.log',
      period: config.logger.period,
      count: config.logger.count,
    },
  ],
});

module.exports = logger;

module.exports.stream = {
  write: function(message) {
    logger.info(message);
  },
};

// Logging Levels: fatal, error, warn, info, debug, trace
