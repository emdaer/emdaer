jest.mock('./executePlugin');
const executePlugins = require('./executePlugins');
const executePlugin = require('./executePlugin');
const EmdaerError = require('./EmdaerError');
const { NO_PLUGIN } = require('../errors');

describe('executePlugins', () => {
  test('returns unaltered content when no transforms are found', async () => {
    const CONTENT = 'sup dawg';
    expect(await executePlugins(CONTENT)).toBe(CONTENT);
  });
  test('executes plugins', async () => {
    await executePlugins(`# <!--emdaer-p
  - '@emdaer/plugin-a'
  - foo: 1
-->

---

<!--emdaer-p
  - '@emdaer/plugin-b'
  - foo: 1
    bar: 2
-->
`);
    expect(executePlugin.mock.calls).toEqual([
      [['@emdaer/plugin-a', { foo: 1 }]],
      [['@emdaer/plugin-b', { foo: 1, bar: 2 }]],
    ]);
  });

  test('can handle invalid comments', async () => {
    const CONTENT = '<!--emdaer-p -->';
    try {
      await executePlugins(CONTENT);
    } catch (err) {
      expect(err).toBeInstanceOf(EmdaerError);
      expect(err.code).toBe(NO_PLUGIN);
    }
  });
});
