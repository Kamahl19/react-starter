const bunyan = require('bunyan');
const fs = require('fs');

const logDirectory = process.env.LOG_DIR || '/logs';

try {
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
}
catch (ex) {
    console.log(`Cannot create log directory: ${ex}`);
}

const logger = bunyan.createLogger({
    name: 'react-starter-backend',
    streams: [{
        stream: process.stdout,
    }, {
        type: 'rotating-file',
        path: logDirectory + '/logs.log',
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
