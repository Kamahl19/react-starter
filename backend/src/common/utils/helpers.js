module.exports = {
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
  normalizePort: val => {
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

  /**
   * Validation error formatters
   */
  splitCamelCase: camelCase => camelCase.replace(/([A-Z][a-z])/g, ' $1'),

  capitalize: string => string.charAt(0).toUpperCase() + string.slice(1),

  formatError: message => {
    const msgArr = message.split('"');

    if (!msgArr[1].includes(' ')) {
      msgArr[1] = this.capitalize(this.splitCamelCase(msgArr[1]));
    }

    return msgArr.join('"');
  },

  getErrorMessage: errors => errors.map(({ message }) => this.formatError(message)).join('\n'),
};
