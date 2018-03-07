/* @flow */

const generateHash = require('./generateHash');

/*
Adds a stamp to the file
*/
module.exports = function addStamp(content: string) {
  return `<!--
  emdaerHash:${generateHash(content)}
-->

${content}`;
};
