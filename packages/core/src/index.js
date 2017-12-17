/* @flow */

const addStamp = require('./util/addStamp');
const executePlugins = require('./util/executePlugins');
const applyTransforms = require('./util/applyTransforms');
const identifyTransforms = require('./util/identifyTransforms');

async function emdaer(origin: string, content: string, stamp: boolean = true) {
  const transforms = await identifyTransforms(content);

  let output;

  output = await executePlugins(content);

  output = await applyTransforms(output, transforms);

  if (stamp) {
    output = await addStamp(output, origin);
  }

  return output;
}

module.exports = emdaer;
