/* @flow */

const marked = require('marked');

const executePlugins = require('./util/executePlugins');
const applyTransforms = require('./util/applyTransforms');
const identifyTransforms = require('./util/identifyTransforms');
const markedCodeRenderer = require('./util/markedCodeRenderer');

async function emdaer(origin: string, content: string) {
  return marked(
    await applyTransforms(
      await executePlugins(content),
      await identifyTransforms(content)
    ),
    { renderer: markedCodeRenderer }
  );
}

module.exports = emdaer;
