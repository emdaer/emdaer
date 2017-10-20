/* @flow */

import type { Plugin } from '../_types';

const EmdaerError = require('./EmdaerError');
const { NO_PLUGIN } = require('../_errors');

/**
 * Loads a provided plugin
 */
module.exports = function resolvePlugin(pluginName: string): Plugin {
  try {
    return require(pluginName);
  } catch (error) {
    const err = new EmdaerError(`${NO_PLUGIN}: ${pluginName}`);
    err.code = NO_PLUGIN;
    throw err;
  }
};
