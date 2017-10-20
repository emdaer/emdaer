/* @flow */

const addStamp = require('./util/addStamp');
const executePlugins = require('./util/executePlugins');
const applyTransforms = require('./util/applyTransforms');
const identifyTransforms = require('./util/identifyTransforms');

module.exports = async function emdaer(
  origin: string,
  content: string,
  stamp: boolean = true
) {
  const transforms = await identifyTransforms(content);
  const contentWithPluginsExecuted = await executePlugins(content);
  const contentWithTransformsApplied = await applyTransforms(
    contentWithPluginsExecuted,
    transforms
  );
  const text = stamp
    ? await addStamp(contentWithTransformsApplied, origin)
    : contentWithTransformsApplied;
  return text;
};
