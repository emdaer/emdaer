const fixCodeFences = require('./fixCodeFences');

describe('fixCodeFences', () => {
  test('passes through for content with no code fence comments', () => {
    expect(
      fixCodeFences(
        `<!--emdaer-code-fence-start-->\`\`\`js\nconst foo = 'test'.split('');\`\`\`<!--emdaer-code-fence-end-->`
      )
    ).toEqual(`\`\`\`js\nconst foo = 'test'.split('');\`\`\``);
  });
  test('uncomments code fence comments', () => {
    expect(fixCodeFences('pass through')).toBe(`pass through`);
  });
});
