const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const userRoutes = require('./routes/UserRoutes');
const config = require('./config');

const app = express();

// Set port
app.set('port', normalizePort(process.env.PORT || config.port));

// Gzip
app.use(compression());

// Parse body of the POST request
app.use(bodyParser.json());

// Use morgan to log requests to the console
app.use(morgan('dev'));

// Allow CORS
app.use(cors(config.cors));

// Serve frontend app
app.use('/', express.static(__dirname + '/public', { maxAge: config.cacheFilesFor }));

// Routes
app.use('/api', userRoutes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500);

    res.json({
        message: err.message,
        error: (process.env.NODE_ENV === 'development') ? err : {}
    });
});

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const port = parseInt(val, 10);

    // Named pipe
    if (isNaN(port)) {
        return val;
    }

    // Port number
    if (port >= 0) {
        return port;
    }

    return false;
}

module.exports = app;
