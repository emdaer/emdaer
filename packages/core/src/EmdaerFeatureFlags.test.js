describe('EmdaerFeatureFlags', () => {
  describe('#override', () => {
    it('overrides specified value', async () => {
      const EmdaerFeatureFlags = require('./EmdaerFeatureFlags');
      EmdaerFeatureFlags.override('enableASTAndCommonComment', true);
      expect(EmdaerFeatureFlags).toEqual({
        enableASTAndCommonComment: true,
      });
    });
  });
});
