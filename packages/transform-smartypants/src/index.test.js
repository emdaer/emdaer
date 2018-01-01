const smartypants = require('./');

describe('@emdaer/transform-smartypants', () => {
  test('does smartypants stuff', async () => {
    expect(await smartypants('“Log Lady”')).toBe('<p>“Log Lady”</p>\n');
  });
  test('does not interfere with html tags', async () => {
    expect(await smartypants('<p align="center">“Log Lady”</p>')).toBe(
      '<p align="center">“Log Lady”</p>'
    );
  });
  test('does not interfere with graves', async () => {
    const code = '<p align="center">```js\nsomeCode()\n```</p>\n';
    expect(await smartypants(code)).toBe(`<p align="center"><code>js
someCode()</code></p>\n`);
  });
});
