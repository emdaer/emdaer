const markedCodeRenderer = require('./markedCodeRenderer');

describe('markedCodeRenderer', () => {
  test('formats code for a given language', () => {
    expect(markedCodeRenderer.code(`const foo = 'test'.reverse();`, 'js')).toBe(
      `\n\`\`\`js\nconst foo = 'test'.reverse();\n\`\`\`\n`
    );
  });
  test('formats code for without a given language', () => {
    expect(markedCodeRenderer.code(`const foo = 'test'.reverse();`)).toBe(
      `\n\`\`\`\nconst foo = 'test'.reverse();\n\`\`\`\n`
    );
  });
});
