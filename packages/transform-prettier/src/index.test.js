const prettier = require('prettier');
const prettierTransform = require('./');

describe('@emdaer/transform-prettier', () => {
  test('formats content with default prettier options', async () => {
    expect(
      await prettierTransform(`\`\`\`js
const a = 1
\`\`\`
`)
    ).toBe(`\`\`\`js
const a = 1;
\`\`\`
`);
  });
  test('formats with provided options', async () => {
    expect(
      await prettierTransform(
        `\`\`\`js
const a = 'Hello World'
\`\`\`
`,
        { options: { semi: false, singleQuote: false } }
      )
    ).toBe(`\`\`\`js
const a = "Hello World"
\`\`\`
`);
  });
  test('formats with provided config option from file path', async () => {
    prettier.resolveConfig = jest.fn().mockImplementation(async () => ({
      singleQuote: true,
      trailingComma: 'es5',
    }));
    expect(
      await prettierTransform(
        `\`\`\`js
const doThing = (trailing, comma,) => {
  console.log("Quotes are single")
}
\`\`\`
`,
        { options: { config: './prettier.config.js' } }
      )
    ).toBe(`\`\`\`js
const doThing = (trailing, comma) => {
  console.log('Quotes are single');
};
\`\`\`
`);
  });
  test('formats with provided config option from file path', async () => {
    const ERROR = 'File is not there';
    prettier.resolveConfig = jest.fn().mockImplementation(async () => {
      throw new Error('File is not there.');
    });
    return expect(
      prettierTransform('text', {
        options: { config: './prettier.notreal.js' },
      })
    ).rejects.toHaveProperty(
      'message',
      `Prettier failed to resolve config: ${ERROR}.`
    );
  });
});
