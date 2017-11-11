/* @flow */

export type FeatureFlags = {|
  override?: (string, boolean) => void,
  enableASTParsing: boolean,
  enableCommonComment: boolean,
|};

const EmdaerFeatureFlags: FeatureFlags = {
  // Experimental AST parsing of Markdown files:
  enableASTParsing: false,
  // Experimental single comment type:
  enableCommonComment: false,
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
