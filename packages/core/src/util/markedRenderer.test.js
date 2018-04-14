const marked = require('marked');
const renderer = require('./markedRenderer');

describe('markedRenderer', () => {
  test('formats code for a given language', () => {
    expect(
      marked(`\`\`\`js\nconst foo = 'test'.split('');\`\`\``, { renderer })
    ).toBe(
      `<!--emdaer-code-fence-start-->\n\`\`\`js\nconst foo = 'test'.split('');\n\`\`\`\n<!--emdaer-code-fence-end-->`
    );
  });
  test('formats code for without a given language', () => {
    expect(
      marked(`\`\`\`\nconst foo = 'test'.split('');\`\`\``, { renderer })
    ).toBe(`<pre><code>\nconst foo = 'test'.split('');\n</code></pre>\n`);
  });
});
