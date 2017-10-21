## How emdaer works

emdaer processes template files and writes the resulting files to your project.

We match `.emdaer/(**/*).emdaer(.md)` and use the captured part of each matched file to determine the path for the output.

### Plugins & Transforms

```md
# <!--emdaer-p
  - '@emdaer/plugin-value-from-package'
  - value: name
-->

Hello, World!

<!--emdaer-t
  - '@emdaer/transform-smartypants'
  - options: qe
-->

```

This example includes one plugin call (`emdaer-p`) and one transform call (`emdaer-t`).

Both of these calls take the form of yaml tuples where the first item is the name of the function to call and the second item is an options object that is passed to that function.

For plugins, the result of the call replaces the corresponding comment block.

For transforms, the function acts on the entire document and rewrites the entire file.
