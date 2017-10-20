/* @flow */
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
