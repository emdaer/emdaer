const EmdaerError = require('./EmdaerError');
const { NO_TRANSFORM } = require('../errors');

const resolveTransform = require('./resolveTransform');

describe('resolveTransform', () => {
  test('throws when specified transform is not available', () => {
    expect(() => {
      resolveTransform('not-a-thing');
    }).toThrow(NO_TRANSFORM);
    expect(() => {
      resolveTransform('not-a-thing');
    }).toThrow(EmdaerError);
  });
});
