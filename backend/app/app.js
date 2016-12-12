const express = require('express');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const userRoutes = require('./routes/UserRoutes');
const config = require('./config');
const helpers = require('./helpers');

const app = express();

// Set port
app.set('port', helpers.normalizePort(process.env.PORT));

// Parse body params and attach them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Gzip
app.use(compression());

// Use morgan to log requests to the console
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Allow CORS
if (config.cors.origin) {
    const cors = require('cors');
    app.use(cors(config.cors));
}

// Secure app by setting various HTTP headers
app.use(helmet());

// Serve frontend app
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.resolve(__dirname, 'public'), {
        maxAge: config.cacheFilesFor,
    }));
}

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

module.exports = app;
