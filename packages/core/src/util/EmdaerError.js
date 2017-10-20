/* @flow */

/**
 * @class
 * A custom error class which has a `code` property that
 * should align with emdaer errors defined in ../_errors.js
 */
class EmdaerError extends Error {
  code: string;
  constructor(code: string, ...args: any) {
    const [message, ...rest] = args;
    super(message || code, ...rest);

    Error.captureStackTrace(this, EmdaerError);

    this.code = code;
  }
}

module.exports = EmdaerError;
