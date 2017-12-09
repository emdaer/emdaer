/* @flow */

const unified = require('unified');
const parseHtml = require('rehype-parse');
const parseMarkdown = require('remark-parse');
const convertMarkdownToHtml = require('remark-rehype');
const minifyHtml = require('rehype-preset-minify');
const outputHtml = require('rehype-stringify');

const EmdaerFeatureFlags = require('./EmdaerFeatureFlags');

const addStamp = require('./util/addStamp');
const executePlugins = require('./util/executePlugins');
const applyTransforms = require('./util/applyTransforms');
const identifyTransforms = require('./util/identifyTransforms');

async function emdaer(origin: string, content: string, stamp: boolean = true) {
  const transforms = await identifyTransforms(content);

  let output;

  output = await executePlugins(content);

  if (EmdaerFeatureFlags.enableASTAndCommonComment) {
    output = await unified()
      .use(parseHtml)
      .use(parseMarkdown)
      .use(convertMarkdownToHtml)
      .use(minifyHtml)
      .use(outputHtml)
      .process(output)
      .then(String)
      .then(string => `${string}\n`);
  }

  output = await applyTransforms(output, transforms);

  if (stamp) {
    output = await addStamp(output, origin);
  }

  return output;
}

module.exports = emdaer;
