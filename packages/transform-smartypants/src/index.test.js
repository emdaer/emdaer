const smartypants = require('../src');

describe('@emdaer/transform-smartypants', () => {
  test('does smartypants stuff', async () => {
    expect(await smartypants('"Log Lady"')).toBe('&#8220;Log Lady&#8221;');
  });
  test('does not interfere with html tags', async () => {
    expect(await smartypants('<p align="center">"Log Lady"</p>')).toBe(
      '<p align="center">&#8220;Log Lady&#8221;</p>'
    );
  });
  test('does not interfere with graves', async () => {
    const code = '<p align="center">```js\nsomeCode()\n```</p>';
    expect(await smartypants(code)).toBe(code);
  });
  test('does not interfere with quotes enclosed by graves', async () => {
    const doubleQuotedPre = '```const string = "STRING!!!";```';
    expect(await smartypants(doubleQuotedPre)).toBe(doubleQuotedPre);
    const singleQuotedPre = "```const string = 'STRING!!!';```";
    expect(await smartypants(singleQuotedPre)).toBe(singleQuotedPre);
    const doubleQuotedCode = '`const string = "STRING!!!";`';
    expect(await smartypants(doubleQuotedCode)).toBe(doubleQuotedCode);
    const singleQuotedCode = "`const string = 'STRING!!!';`";
    expect(await smartypants(singleQuotedCode)).toBe(singleQuotedCode);
    const multipleLines = `
\`\`\`js
{
  destination: './README.md',
  content: [
    [
      'heading',
      {
        level: 1,
        content: 'Hello, World!'
      }
    ]
  ]
}
\`\`\`
    `;
    expect(await smartypants(multipleLines)).toBe(multipleLines);
  });
});
