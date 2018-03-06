/* @flow */

module.exports.NO_MATCHING_FILES =
  'could not find any files matching .emdaer/**/*.emdaer.md 😳\n';
module.exports.EMDAER_FAILED = 'emdaer failed 😨\n';
module.exports.makeDirtyDestinationWarning = (
  fileName: string,
  fileExtension: string
) =>
  `It appears you have editted ${fileName}${fileExtension} manually. Please move your changes to ${fileName}.emdaer${fileExtension} instead ⚠️\n`;
