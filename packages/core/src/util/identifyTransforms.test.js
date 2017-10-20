const applyTransforms = require('./identifyTransforms');

describe('applyTransforms', () => {
  test('provides empty array when no transforms are found', async () => {
    const CONTENT = ``;
    expect(await applyTransforms(CONTENT)).toEqual([]);
  });
  test('identifies transforms', async () => {
    const CONTENT = `<!--emdaer-t
  - '@emdaer/transform-a'
  - foo: 1
    bar: 2
-->`;
    expect(await applyTransforms(CONTENT)).toEqual([CONTENT]);
  });
});
