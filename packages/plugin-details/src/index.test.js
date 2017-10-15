const details = require('../src');

describe('@emdaer/plugin-details', () => {
  test('generates details without summary', async () => {
    expect(
      await details({
        content: 'fidget spin with me',
      })
    ).toBe(`<details>

fidget spin with me
</details>`);
  });
  test('generates details with summary', async () => {
    expect(
      await details({
        summary: "I'm not proud of myself",
        content: 'fidget spin with me',
      })
    ).toBe(`<details>
<summary><strong>I'm not proud of myself</strong></summary><br />
fidget spin with me
</details>`);
  });
});
