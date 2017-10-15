jest.mock('./applyTransform', jest.fn);

const applyTransforms = require('./applyTransforms');
const applyTransform = require('./applyTransform');

describe('applyTransforms', () => {
  test('returns unaltered content when no transforms are found', async () => {
    const CONTENT = 'sup dawg';
    expect(await applyTransforms(CONTENT)).toBe(CONTENT);
  });
  test('applies transforms', async () => {
    const CONTENT = `# <!--emdaer-p
  - '@emdaer/plugin-a'
  - foo: 1
-->

---

<!--emdaer-t
  - '@emdaer/transform-a'
  - foo: 1
    bar: 2
-->
`;
    await applyTransforms(CONTENT);
    expect(applyTransform).toHaveBeenCalledWith(CONTENT, [
      '@emdaer/transform-a',
      { foo: 1, bar: 2 },
    ]);
  });
});
