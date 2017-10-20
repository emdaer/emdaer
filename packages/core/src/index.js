/* @flow */

const addStamp = require('./util/addStamp');
const executePlugins = require('./util/executePlugins');
const applyTransforms = require('./util/applyTransforms');
const identifyTransforms = require('./util/identifyTransforms');

module.exports = async function emdaer(origin: string, content: string) {
  const transforms = await identifyTransforms(content);
  const contentWithPluginsExecuted = await executePlugins(content);
  const contentWithTransformsApplied = await applyTransforms(
    contentWithPluginsExecuted,
    transforms
  );
  const contentWithStamp = await addStamp(contentWithTransformsApplied, origin);
  return contentWithStamp;
};
