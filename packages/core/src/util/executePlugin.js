/* @flow */
/* eslint-disable no-use-before-define */

import type { PluginCall } from '../types';

const resolvePlugin = require('./resolvePlugin');

async function executeNested(options: *): {} {
  if (options && options.from) {
    const [utilityPlugin, utilityOptions] = options.from;
    return Object.assign({}, options, {
      content: await executePlugin([utilityPlugin, utilityOptions]),
    });
  }
  return options;
}

/**
 * Executes a plugin to generate content
 */
async function executePlugin([plugin, options]: PluginCall): Promise<string> {
  return (await resolvePlugin(plugin))(await executeNested(options));
}

module.exports = executePlugin;
