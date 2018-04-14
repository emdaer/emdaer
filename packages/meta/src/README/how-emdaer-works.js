module.exports = `## How emdaer works

emdaer processes template files and writes the resulting files to your project.

We match \`.emdaer/(**/*).emdaer(.md)\` and use the captured part of each matched file to determine the path for the output.

### Plugins & Transforms

<!-- prettier-ignore-start -->
\`\`\`md
# <!--emdaer-p
  - '@emdaer/plugin-value-from-package'
  - value: name
-->

Hello, World!

<!--emdaer-t
  - '@emdaer/transform-prettier'
  - options:
      proseWrap: preserve
      singleQuote: true
      trailingComma: es5
-->
\`\`\`
<!-- prettier-ignore-end -->

This example includes one plugin call (\`emdaer-p\`) and one transform call (\`emdaer-t\`).

Both of these calls take the form of yaml tuples where the first item is the name of the function to call and the second item is an options object that is passed to that function.

For plugins, the result of the call replaces the corresponding comment block.

For transforms, the function acts on the entire document and rewrites the entire file.

### Code Fences
Platforms vary in how they provide syntax highlighted code to users READMEs, rendering code fences with language specificers as HTML/CSS, each in their own way. Emdaer also transforms your readme in HTML via [marked](https://github.com/markedjs/marked) to make it more portable. 

Instead of trying to guess how platforms expect the HTML/CSS of a code fence to be output, when emdaer encounters a code fence with a language specified, it will ignore it. This means that while the rest of your readme will be transformed to HTML, code fences will remain in Markdown. This sacrifices a bit of portability for the sake of readability and UX.

_NOTE:_ If it's important that your README be pure HTML, do not use language specifiers in your code fences.
`;
