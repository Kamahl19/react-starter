'use strict';

const mongoose = require('mongoose');
const logger = require('../common/services/logger');
const config = require('./config');

mongoose.Promise = global.Promise;

function init({ onConnected, onDisconnected, onError }) {
  mongoose.connection.on('connected', () => {
    logger.info('MongoDB connected');
    onConnected && onConnected();
  });

  mongoose.connection.on('disconnected', () => {
    logger.info('MongoDB disconnected');
    onDisconnected && onDisconnected();
  });

  mongoose.connection.on('error', err => {
    logger.error(`MongoDB error: ${err}`);
    onError && onError();
  });
}

function connect() {
  mongoose.connect(process.env.MONGO_URL, config.mongolab.options);
}

function closeConnection(cb) {
  mongoose.connection.close(() => {
    cb();
  });
}

module.exports = {
  init,
  closeConnection,
  connect,
};
