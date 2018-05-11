module.exports = {
  parser: 'babel-eslint',
  plugins: ['jest', 'prettier', 'flowtype'],
  env: {
    'jest/globals': true,
  },
  extends: ['airbnb-base', 'prettier', 'prettier/flowtype'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['scripts/**'],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
      },
    ],
    'import/no-dynamic-require': ['off'],
    'global-require': ['off'],
    'no-new': ['off'],
  },
};
