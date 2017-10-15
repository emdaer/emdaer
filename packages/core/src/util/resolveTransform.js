/* @flow */

import type { Transform } from '../_types';

const { NO_TRANSFORM } = require('../_errors');

/**
  * Loads a provided transform
  */
module.exports = function resolveTransform(transformName: string): Transform {
  try {
    return require(transformName);
  } catch (error) {
    throw new Error(`${NO_TRANSFORM}: ${transformName}`);
  }
};
