/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies */

jest.mock('@emdaer/plugin-foo', jest.fn, { virtual: true });
jest.mock('@emdaer/plugin-bar', () => () => 'Hello, World!', { virtual: true });

const fooMock = require('@emdaer/plugin-foo');

const executePlugin = require('./executePlugin');

describe('executePlugin', () => {
  test('executes plugin', async () => {
    await executePlugin(['@emdaer/plugin-foo']);
    expect(fooMock).toHaveBeenCalled();
  });
  test('executes plugin with nested plugins', async () => {
    await executePlugin([
      '@emdaer/plugin-foo',
      { from: ['@emdaer/plugin-bar'] },
    ]);
    expect(fooMock).toHaveBeenCalledWith({
      content: 'Hello, World!',
      from: ['@emdaer/plugin-bar'],
    });
  });
});
