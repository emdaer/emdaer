/* @flow */

const marked = require('marked');
const { minify } = require('html-minifier');

const executePlugins = require('./util/executePlugins');
const applyTransforms = require('./util/applyTransforms');
const identifyTransforms = require('./util/identifyTransforms');

async function emdaer(origin: string, content: string) {
  return minify(
    marked(
      await applyTransforms(
        await executePlugins(content),
        await identifyTransforms(content)
      )
    ),
    { removeComments: true }
  );
}

module.exports = emdaer;
