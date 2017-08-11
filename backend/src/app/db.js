const mongoose = require('mongoose');
const logger = require('../common/services/logger');
const config = require('./config');

mongoose.Promise = global.Promise;

function init(onConnected) {
  mongoose.connection.on('connected', () => {
    logger.info('MongoDB connected');

    onConnected();
  });

  mongoose.connection.on('disconnected', () => {
    logger.info('MongoDB disconnected');
  });

  mongoose.connection.on('error', err => {
    logger.error(`MongoDB error: ${err}`);
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
