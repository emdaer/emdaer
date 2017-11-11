describe('EmdaerFeatureFlags', () => {
  describe('#override', () => {
    it('overrides specified value', async () => {
      const EmdaerFeatureFlags = require('./EmdaerFeatureFlags');
      EmdaerFeatureFlags.override('enableASTParsing', true);
      expect(EmdaerFeatureFlags).toEqual({
        enableASTParsing: true,
        enableCommonComment: false,
      });
    });
  });
});
