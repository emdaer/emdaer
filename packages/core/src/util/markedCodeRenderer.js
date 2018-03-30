const marked = require('marked');

const renderer = new marked.Renderer();

renderer.code = function markedCodeRenderer(code, language) {
  return `\n\`\`\`${language || ''}\n${code}\n\`\`\`\n`;
};

module.exports = renderer;
