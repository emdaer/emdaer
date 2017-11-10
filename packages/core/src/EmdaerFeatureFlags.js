/* @flow */

type FeatureFlags = {|
  enableASTParsing: boolean,
  enableCommonComment: boolean,
|};

const EmdaerFeatureFlags: FeatureFlags = {
  // Experimental AST parsing of Markdown files:
  enableASTParsing: false,
  // Experimental single comment type:
  enableCommonComment: false,
};

module.exports = EmdaerFeatureFlags;
