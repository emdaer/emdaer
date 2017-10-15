const { NO_PLUGIN } = require('../_errors');

const resolvePlugin = require('./resolvePlugin');

describe('resolvePlugin', () => {
  test('throws when specified plugin is not available', () => {
    expect(() => {
      resolvePlugin('not-a-thing');
    }).toThrow(NO_PLUGIN);
  });
});
