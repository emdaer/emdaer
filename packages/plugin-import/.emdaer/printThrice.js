/**
 * Prints a string three times
 * @example
 * printThrice('Hello World! x3')
 * @example
 * printThrice('Another example. (printed 3 times!)')
 * @param {string} item
 * @returns {string} item printed 3 times
 */
module.exports = function printThrice(item) {
  return Array.from(Array(3))
    .map(() => `${item}</br>`)
    .join('');
};
