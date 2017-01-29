require('app-module-path/cwd');

// Load .env file with all the configuration
require('dotenv').config();

const http = require('http');
const mongoose = require('mongoose');
const logger = require('app/utils/logger');
const config = require('app/config');
const app = require('app/app');

const server = http.createServer(app);

// Use ES6 Promise in Mongoose
mongoose.Promise = global.Promise;

// Catch MongoDB `connect` event
mongoose.connection.on('connected', () => {
    logger.info('MongoDB connected');

    server.listen(app.get('port'), '0.0.0.0');
});

// Catch MongoDB `disconnect` event
mongoose.connection.on('disconnected', () => {
    logger.fatal('MongoDB disconnected');
});

// Catch MongoDB `error` event
mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB error: ${err}`);
});

// Catch Server `listening` event
server.on('listening', () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `${addr.address}:${addr.port}`;

    logger.info(`Listening on ${bind}`);
    logger.info(`Environment on ${process.env.NODE_ENV}`);
});

// Catch server `error` event
server.on('error', (error) => {
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

// Catch `process termination` event
process.on('SIGINT', cleanShutDown).on('SIGTERM', cleanShutDown);

// Connect to MongoDB
try {
    mongoose.connect(process.env.MONGO_URL, config.mongolab.options);
}
catch (err) {
    logger.fatal(`Sever initialization failed: ${err.message}`);
}

function cleanShutDown(code = 0) {
    mongoose.connection.close(() => {
        logger.info('Mongoose connection with DB is disconnected through app termination');

        process.exit(code);
    });
}
