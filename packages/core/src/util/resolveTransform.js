/* @flow */

import type { Transform } from '../types';

const EmdaerError = require('./EmdaerError');
const { NO_TRANSFORM } = require('../errors');

/**
 * Loads a provided transform
 */
module.exports = function resolveTransform(transformName: string): Transform {
  try {
    return require(transformName);
  } catch (error) {
    const err = new EmdaerError(
      NO_TRANSFORM,
      `${NO_TRANSFORM}: ${transformName}`
    );
    throw err;
  }
};
