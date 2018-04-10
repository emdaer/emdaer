/* @flow */

const marked = require('marked');
const { minify } = require('html-minifier');

const executePlugins = require('./util/executePlugins');
const applyTransforms = require('./util/applyTransforms');
const identifyTransforms = require('./util/identifyTransforms');
const renderer = require('./util/markedRenderer');
const fixCodeFences = require('./util/fixCodeFences');

async function emdaer(origin: string, content: string) {
  return fixCodeFences(
    minify(
      marked(
        await applyTransforms(
          await executePlugins(content),
          await identifyTransforms(content)
        ),
        { renderer }
      )
    )
  );
}

module.exports = emdaer;
