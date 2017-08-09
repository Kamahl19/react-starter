/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = val => {
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
};

/**
 * Format error message
 */
const splitCamelCase = camelCase => camelCase.replace(/([A-Z][a-z])/g, ' $1');

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

const formatErrorMessage = errors =>
  errors.map(({ message }) => {
    const msgArr = message.split('"');

    if (!msgArr[1].includes(' ')) {
      msgArr[1] = capitalize(splitCamelCase(msgArr[1]));
    }

    return msgArr.join('"');
  });

module.exports = {
  normalizePort,
  formatErrorMessage,
};
