/* @flow */

const documentation = require('documentation');

/**
 * Render a jsdoc tag's value for a given file/function
 * @example
 * <!--emdaer-p
 *   - '@emdaer/plugin-jsdoc-tag-value'
 *   - source: ./src/index.js
 *     functionName: jsdocTagValue
 *     tag: example
 *     tagIndex: 0
 * -->
 * @example
 * <!--emdaer-p
 *   - '@emdaer/plugin-jsdoc-tag-value'
 *   - source: ./src/index.js
 *     functionName: jsdocTagValue
 *     tag: example
 * -->
 * @param                     options
 * @param   {string}          [options.source] The file that contains the function
 * @param   {string}          [options.functionName] The function name that contains the desired jsdoc tag
 * @param   {string}          [options.tag] The tag from whom to pull the value
 * @param   {string}          [options.tagIndex] The index for the tag from whom to pull the value. If not present, all values for a given tag will be pulled.
 * @returns {Promise<string>} The link as an anchor HTML element.
 */
async function jsdocTagValue({
  source,
  functionName,
  tag,
  tagIndex,
}: {
  source: string,
  functionName: string,
  tag: string,
  tagIndex?: number,
}): Promise<?string> {
  if (!source) {
    throw new Error('source option expected by plugin-jsdoc-value plugin');
  }
  if (!functionName) {
    throw new Error(
      'functionName option expected by plugin-jsdoc-value plugin'
    );
  }
  if (!tag) {
    throw new Error('tag option expected by plugin-jsdoc-value plugin');
  }
  const doc = (await documentation.build([source], {})).find(
    func => func.name === functionName
  );
  if (!doc) {
    throw new Error(`${functionName} jsdoc from ${source} does not exist`);
  }
  const tagValues = doc.tags.filter(tagInfo => tagInfo.title === tag);
  if (tagValues.length === 0) {
    throw new Error(`${tag} not found in ${functionName} jsdoc from ${source}`);
  }
  const content = [];
  if (typeof tagIndex !== 'undefined') {
    if (typeof tagValues[tagIndex] === 'undefined') {
      throw new Error(
        `${functionName} of ${source} has no ${tag} tag at index ${tagIndex}`
      );
    }
    content.push(tagValues[tagIndex]);
  } else {
    content.splice(0, 0, ...tagValues);
  }
  return content.map(({ description }) => description).join(`
`);
}

module.exports = jsdocTagValue;
