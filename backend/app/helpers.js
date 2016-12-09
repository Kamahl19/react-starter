const helpers = {
    /**
     * Return success result
     */
    getSuccessResult: (res, data) => res.json({ success: true, data }),

    /**
     * Return fail result
     */
    getFailResult: (res, data) => res.json({ success: false, data }),

    /**
     * Normalize a port into a number, string, or false.
     */
    normalizePort: (val) => {
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
    },
};

module.exports = helpers;
