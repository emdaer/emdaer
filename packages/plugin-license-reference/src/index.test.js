const licenseReference = require('./');

describe('@emdaer/plugin-license-reference', () => {
  test('generates license reference', async () => {
    expect(await licenseReference()).toBe(
      'emdaer is [MIT licensed](./LICENSE).'
    );
  });
});
