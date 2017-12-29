/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies */

jest.mock('@emdaer/transform-foo', jest.fn, {
  virtual: true,
});

const applyTransform = require('./applyTransform');
const transformMock = require('@emdaer/transform-foo');

describe('applyTransform', () => {
  test('applies a transform', async () => {
    const CONTENT = '';
    const TRANSFORM = '@emdaer/transform-foo';
    const OPTIONS = { doIt: true };

    await applyTransform(CONTENT, [TRANSFORM, OPTIONS], 'foobar');
    expect(transformMock).toHaveBeenCalledWith(CONTENT, OPTIONS, 'foobar');
  });
});
