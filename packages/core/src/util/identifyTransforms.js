/* @flow */

/**
 * Identifies transforms
 */
module.exports = async function identifyTransforms(
  content: string
): Promise<Array<string>> {
  return content.match(/<!--emdaer-t[\s\S]*?-->/g) || [];
};
