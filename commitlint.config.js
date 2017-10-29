module.exports = {
  extends: ['@commitlint/config-angular', '@commitlint/config-lerna-scopes'],
  rules: {
    'header-max-length': [2, 'always', 100],
  },
};
