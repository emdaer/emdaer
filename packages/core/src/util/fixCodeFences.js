/* @flow */

/**
 * Applies transforms to generated content
 */
module.exports = function fixCodeFences(content: string): string {
  return content.replace(
    /(<!--emdaer-code-fence-start)([\s\S]*?)(emdaer-code-fence-end-->)/g,
    (...args) => args[2]
  );
};
