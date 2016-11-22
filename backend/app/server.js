const http = require('http');
const mongoose = require('mongoose');
const config = require('./config');
const app = require('./app');
const SeedDB = require('./SeedDB');

const server = http.createServer(app);

/**
 * Event listener for connecting to MongoDB
 */
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');

    // Seed DB
    SeedDB.seed();

    server.listen(app.get('port'), '0.0.0.0');
});

/**
 * Event listener for disconnecting from MongoDB
 */
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

/**
 * Event listener for MongoDB "error" event
 */
mongoose.connection.on('error', (err) => {
    console.error('MongoDB error:', err);
});

/**
 * Event listener for server "listening" event
 */
server.on('listening', () => {
    const addr = server.address();

    console.log('Listening on ' + addr.address + ':' + addr.port);
});

/**
 * Event listener for server "error" event
 */
server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = ((typeof port === 'string') ? 'Pipe ' : 'Port ') + app.get('port');

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            cleanShutDown(1);
            break;

        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            cleanShutDown(1);
            break;

        default:
            throw error;
    }
});

/**
 * Event listener for terminating the app
 */
process.on('SIGINT', cleanShutDown).on('SIGTERM', cleanShutDown);

/**
 * Callback for exiting the app
 */
function cleanShutDown(code = 0) {
    mongoose.connection.close(() => {
        console.log('Mongoose connection with DB is disconnected through app termination');

        process.exit(code);
    });
}

/**
 * Connect to MongoDB
 */
try {
    mongoose.connect(config.mongolab.url, config.mongolab.options);
}
catch (err) {
    console.error('Sever initialization failed ', err.message);
}
