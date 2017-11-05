function getEnabledFeatureFlags(featureFlags) {
  return Object.entries(featureFlags)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join(', ');
}

module.exports = getEnabledFeatureFlags;
