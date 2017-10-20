const EmdaerError = require('./EmdaerError');

describe('EmdaerError', () => {
  test('is an Error', () => {
    const e = new EmdaerError('test-code', 'test message');
    expect(e).toBeInstanceOf(Error);
    expect(e.stack).toBeDefined();
    expect(e.message).toBe('test message');
    expect(e.code).toBe('test-code');
  });

  test('can default message', () => {
    const e = new EmdaerError('test-code');
    expect(e.message).toBe('test-code');
  });
});
