const documentation = require('../src');

describe('@emdaer/plugin-documentation', () => {
  test('generates documentation', async () => {
    expect(
      typeof await documentation({
        sources: ['./packages/emdaer-plugin-documentation/src/index.js'],
      })
    ).toBe('string');
  });
});
