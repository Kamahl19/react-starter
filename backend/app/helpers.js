const helpers = {
    /**
     * Return success result
     */
    getSuccessResult: (res, data) => res.json({ success: true, data }),

    /**
     * Return fail result
     */
    getFailResult: (res, data) => res.json({ success: false, data }),
};

module.exports = helpers;
