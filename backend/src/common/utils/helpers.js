const crypto = require('crypto');

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
 * Generate Hex Token
 */
function generateHexToken() {
  return crypto.randomBytes(16).toString('hex');
}

module.exports = {
  normalizePort,
  generateHexToken,
};
