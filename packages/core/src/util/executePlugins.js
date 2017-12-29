/* @flow */

const { safeLoad } = require('js-yaml');

const executePlugin = require('./executePlugin');
const EmdaerError = require('./EmdaerError');
const { NO_PLUGIN } = require('../errors');

/**
 * Finds and executes plugins
 */
module.exports = async function executePlugins(
  content: string
): Promise<string> {
  const replacementContent = content;
  const matches = replacementContent.match(/<!--emdaer-p[\s\S]*?-->/g) || [];

  return matches.reduce((acc, match): Promise<string> => {
    const [comment, , body] = /(<!--emdaer-p)([\s\S]*?)(-->)/g.exec(match);
    if (!body.trim()) {
      throw new EmdaerError(NO_PLUGIN, 'Invalid emdaer comment');
    }
    return (async () => {
      const accContent = await acc;
      return accContent.replace(comment, await executePlugin(safeLoad(body)));
    })();
  }, Promise.resolve(replacementContent));
};
