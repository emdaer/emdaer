/* @flow */

import type { Plugin } from '../_types';

const { NO_PLUGIN } = require('../_errors');

/**
 * Loads a provided plugin
 */
module.exports = function resolvePlugin(pluginName: string): Plugin {
  try {
    return require(pluginName);
  } catch (error) {
    throw new Error(`${NO_PLUGIN}: ${pluginName}`);
  }
};
