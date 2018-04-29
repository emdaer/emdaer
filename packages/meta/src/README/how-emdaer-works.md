## How emdaer works

emdaer processes template files and writes the resulting files to your project.

We match `.emdaer/(**/*).emdaer(.md)` and use the captured part of each matched file to determine the path for the output.

### Plugins & Transforms

<!-- prettier-ignore-start -->
```md
# <!--emdaer-p
  - '@emdaer/plugin-value-from-package'
  - value: name
-->

Hello, World!

<!--emdaer-p
  - '@emdaer/plugin-import'
  - path: './.emdaer/printThrice.js'
    args:
      - 'Hey'
-->

<!--emdaer-t
  - '@emdaer/transform-prettier'
  - options:
      proseWrap: preserve
      singleQuote: true
      trailingComma: es5
-->
```
<!-- prettier-ignore-end -->

This example, once processed, will look something like this:

```md
<h1>mypackage-name</h1>

<p>Hello, World!</p>

<p>Hey<br>Hey<br>Hey</p>
```

This example includes two plugin calls (`emdaer-p`) and one transform call (`emdaer-t`).

<details>
<summary>Help</summary>
The first plugin call is to [@emdaer/plugin-value-from-package](/emdaer/emdaer/blob/master/packages/plugin-value-from-package). It is used to get the value of `name` from `package.json`. That way if your project name change, so does your README.

The second plugin call is to [@emdaer/plugin-import](/emdaer/emdaer/blob/master/packages/plugin-import). It is used to import a function called `printThrice` and executing it with the argument `Hey`, printing it three times. The `path` parameter can be any node modules that exports a string, exports a function that returns a string, or exports a funciton that returns a promise that resolves to a string. 

The third emdaer call is to [@emdaer/transform-prettier](/emdaer/emdaer/blob/master/packages/transform-prettier). It will format your README with the given options so you don't have to.
</details>

Emdaer plugin/transform calls are just html comments.
These calls take the form of yaml tuples where the first item is the name of the function to call and the second item is an options object that is passed to that function.

For plugins, the result of the call replaces the corresponding comment block.

For transforms, the function acts on the entire document and rewrites the entire file. In some cases, like [@emdaer/transform-table-of-contents](/emdaer/emdaer/blob/master/packages/transform-table-of-contents), transforms can inline their content, replacing the corresponding comment block.

### Code Fences
Platforms vary in how they provide syntax highlighted code to users READMEs, rendering code fences with language specificers as HTML/CSS, each in their own way. Emdaer also transforms your README in HTML via [marked](https://github.com/markedjs/marked) to make it more portable. 

Instead of trying to guess how platforms expect the HTML/CSS of a code fence to be output, when emdaer encounters a code fence with a language specified, it will ignore it. This means that while the rest of your README will be transformed to HTML, code fences will remain in Markdown. This sacrifices a bit of portability for the sake of readability and UX.

_NOTE:_ If it's important that your README be pure HTML, do not use language specifiers in your code fences.