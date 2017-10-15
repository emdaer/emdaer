const smartypants = require('../src');

describe('@emdaer/transform-smartypants', () => {
  test('does smartypants stuff', async () => {
    expect(await smartypants('"Log Lady"', { options: 'q' })).toBe(
      '&#8220;Log Lady&#8221;'
    );
  });
  test('does not interfere with html tags', async () => {
    expect(
      await smartypants('<p align="center">"Log Lady"</p>', { options: 'q' })
    ).toBe('<p align="center">&#8220;Log Lady&#8221;</p>');
  });
  test('does not interfere with graves', async () => {
    const code = '<p align="center">```js\nsomeCode()\n```</p>';
    expect(await smartypants(code, { options: 'q' })).toBe(code);
  });
  test('does not interfere with quotes enclosed by graves', async () => {
    const doubleQuotedPre = '```const string = "STRING!!!";```';
    expect(await smartypants(doubleQuotedPre, { options: 'q' })).toBe(
      doubleQuotedPre
    );
    const singleQuotedPre = "```const string = 'STRING!!!';```";
    expect(await smartypants(singleQuotedPre, { options: 'q' })).toBe(
      singleQuotedPre
    );
    const doubleQuotedCode = '`const string = "STRING!!!";`';
    expect(await smartypants(doubleQuotedCode, { options: 'q' })).toBe(
      doubleQuotedCode
    );
    const singleQuotedCode = "`const string = 'STRING!!!';`";
    expect(await smartypants(singleQuotedCode, { options: 'q' })).toBe(
      singleQuotedCode
    );
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
    expect(await smartypants(multipleLines, { options: 'q' })).toBe(
      multipleLines
    );
  });
});
