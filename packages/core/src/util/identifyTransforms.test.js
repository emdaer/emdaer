const applyTransforms = require('./identifyTransforms');

describe('applyTransforms', () => {
  test('identifies transforms', async () => {
    const CONTENT = `<!--emdaer-t
  - '@emdaer/transform-a'
  - foo: 1
    bar: 2
-->`;
    expect(await applyTransforms(CONTENT)).toEqual([CONTENT]);
  });
});
