const marked = require('marked');

const renderer = new marked.Renderer();

renderer.code = function markedRenderer(code, language) {
  if (language) {
    return `<!--emdaer-code-fence\n\`\`\`${language}\n${code}\n\`\`\`\n-->\n`;
  }
  return `<pre><code>\n${code}\n</code></pre>\n`;
};

module.exports = renderer;
