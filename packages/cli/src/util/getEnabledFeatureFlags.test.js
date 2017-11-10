const getEnabledFeatureFlags = require('./getEnabledFeatureFlags');

describe('getEnabledFeatureFlags', () => {
  test('gets feature flags when they are enabled', async () => {
    expect(getEnabledFeatureFlags({ theBestFeature: true })).toBe(
      'theBestFeature'
    );
    expect(
      getEnabledFeatureFlags({
        theBestFeature: true,
        youWillNotBelieve: true,
      })
    ).toBe('theBestFeature, youWillNotBelieve');
  });
  test('omits feature flags when they are disabled', async () => {
    expect(getEnabledFeatureFlags({ theBestFeature: false })).toBe('');
    expect(
      getEnabledFeatureFlags({
        theBestFeature: false,
        youWillNotBelieve: true,
      })
    ).toBe('youWillNotBelieve');
  });
});
