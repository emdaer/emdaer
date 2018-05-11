/* @flow */

const marked = require('marked');
const { minify } = require('html-minifier');

const executePlugins = require('./util/executePlugins');
const applyTransforms = require('./util/applyTransforms');
const identifyTransforms = require('./util/identifyTransforms');
const markedRenderer = require('./util/markedRenderer');
const fixCodeFences = require('./util/fixCodeFences');

async function emdaer(
  origin: string,
  content: string,
  options: {
    marked: boolean,
    markedOptions: Object,
  } = {
    marked: true,
    markedOptions: {
      renderer: markedRenderer,
      smartypants: true,
    },
  }
): Promise<string> {
  const readme = await applyTransforms(
    await executePlugins(content),
    await identifyTransforms(content)
  );
  return options.marked
    ? fixCodeFences(minify(marked(readme, options.markedOptions)))
    : readme;
}

module.exports = emdaer;
