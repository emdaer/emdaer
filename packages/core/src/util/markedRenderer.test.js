const marked = require('marked');
const renderer = require('./markedRenderer');

describe('markedRenderer', () => {
  test('formats code for a given language', () => {
    expect(
      marked(`\`\`\`js\nconst foo = 'test'.reverse();\`\`\``, { renderer })
    ).toBe(
      `<!--emdaer-code-fence\n\`\`\`js\nconst foo = 'test'.reverse();\n\`\`\`\n-->\n`
    );
  });
  test('formats code for without a given language', () => {
    expect(
      marked(`\`\`\`\nconst foo = 'test'.reverse();\`\`\``, { renderer })
    ).toBe(`<pre><code>\nconst foo = 'test'.reverse();\n</code></pre>\n`);
  });
});
