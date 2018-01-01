/* @flow */

const { safeLoad } = require('js-yaml');

const EmdaerError = require('./EmdaerError');
const { NO_TRANSFORM } = require('../errors');
const applyTransform = require('./applyTransform');

/**
 * Applies transforms to generated content
 */
module.exports = async function applyTransforms(
  content: string,
  transforms: Array<string>
): Promise<string> {
  return transforms.reduce(async (acc, match): Promise<string> => {
    const [comment, , body] = /(<!--emdaer-t)([\s\S]*?)(-->)/g.exec(match);
    if (!body.trim()) {
      throw new EmdaerError(NO_TRANSFORM, 'Invalid emdaer comment');
    }
    return (await applyTransform(await acc, safeLoad(body), comment)).replace(
      comment,
      ''
    );
  }, Promise.resolve(content));
};
