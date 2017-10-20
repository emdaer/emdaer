/* @flow */

import type { Transform } from '../_types';

const EmdaerError = require('./EmdaerError');
const { NO_TRANSFORM } = require('../_errors');

/**
  * Loads a provided transform
  */
module.exports = function resolveTransform(transformName: string): Transform {
  try {
    return require(transformName);
  } catch (error) {
    const err = new EmdaerError(`${NO_TRANSFORM}: ${transformName}`);
    err.code = NO_TRANSFORM;
    throw err;
  }
};
