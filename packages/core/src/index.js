/* @flow */

const addStamp = require('./util/addStamp');
const executePlugins = require('./util/executePlugins');
const applyTransforms = require('./util/applyTransforms');

module.exports = async function emdaer(origin: string, content: string) {
  return addStamp(await applyTransforms(await executePlugins(content)), origin);
};
