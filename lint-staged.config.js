module.exports = {
  '*.js': ['eslint --fix', 'prettier --write', 'git add'],
  '*.emdaer.md': ['emdaer --yes', 'git add'],
  '.emdaer/.offline/**/*.json': ['git add'],
};
