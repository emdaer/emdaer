/* @flow */

export type FeatureFlags = {|
  override?: (string, boolean) => void,
  enableASTAndCommonComment: boolean,
|};

const EmdaerFeatureFlags: FeatureFlags = {
  // Experimental AST parsing of Markdown files and common comment type:
  enableASTAndCommonComment: false,
};

Object.defineProperty(EmdaerFeatureFlags, 'override', {
  enumerable: false,
  writable: false,
  configurable: false,
  value(key, value) {
    this[key] = value;
  },
});

module.exports = EmdaerFeatureFlags;
