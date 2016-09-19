'use strict';

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
     * Enum to Array
     */
    enumToArray: (enumeration) => enumeration.map((e) => e.value),
};

module.exports = helpers;
