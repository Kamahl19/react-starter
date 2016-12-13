const bunyan = require('bunyan');
const path = require('path');

const logger = bunyan.createLogger({
    name: 'react-starter-backend',
    streams: [{
        stream: process.stdout,
    }, {
        type: 'rotating-file',
        path: path.resolve(__dirname, 'logs', 'logs.log'),
        period: '7d',
        count: 53,
    }]
});

module.exports = logger;

module.exports.stream = {
    write: function(message) {
        logger.info(message);
    }
};

// Logging Levels: fatal, error, warn, info, debug, trace
