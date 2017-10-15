/* @flow */

const { safeLoad } = require('js-yaml');

const applyTransform = require('./applyTransform');

/**
 * Applies transforms to generated content
 */
module.exports = async function applyTransforms(
  content: string
): Promise<string> {
  const replacementContent = content;
  const matches = replacementContent.match(/<!--emdaer-t[\s\S]*?-->/g) || [];

  return matches.reduce((acc, match): Promise<string> => {
    const [, , body] = /(<!--emdaer-t)([\s\S]*?)(-->)/g.exec(match);
    return (async () => {
      const accContent = await acc;
      return applyTransform(accContent, safeLoad(body));
    })();
  }, Promise.resolve(replacementContent));
};
