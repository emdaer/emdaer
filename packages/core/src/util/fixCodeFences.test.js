const fixCodeFences = require('./fixCodeFences');

describe('fixCodeFences', () => {
  test('passes through for content with no code fence comments', () => {
    expect(
      fixCodeFences(
        `<!--emdaer-code-fence\`\`\`js\nconst foo = 'test'.reverse();\`\`\`-->`
      )
    ).toEqual(`\`\`\`js\nconst foo = 'test'.reverse();\`\`\``);
  });
  test('uncomments code fence comments', () => {
    expect(fixCodeFences('pass through')).toBe(`pass through`);
  });
});
