/**
 * @class
 * A custom error class which has a `code` property that
 * should align with emdaer errors defined in ../errors.js
 */
class EmdaerError extends Error {
  constructor(code, ...args) {
    const [message, ...rest] = args;
    super(message || code, ...rest);

    Error.captureStackTrace(this, EmdaerError);

    this.code = code;
  }
}

module.exports = EmdaerError;
