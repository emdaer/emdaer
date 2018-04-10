/* @flow */

/**
 * Applies transforms to generated content
 */
module.exports = function fixCodeFences(content: string): string {
  return content.replace(
    /(<!--emdaer-code-fence)([\s\S]*?)(-->)/g,
    (...args) => args[2]
  );
};
