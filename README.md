<!--
  This file was generated by emdaer

  Its template can be found at .emdaer/README.emdaer.md
-->

# emdaer · [![Travis](https://img.shields.io/travis/emdaer/emdaer.svg?style=flat-square)](https://travis-ci.org/emdaer/emdaer/) [![Documented with emdaer](https://img.shields.io/badge/📓-documented%20with%20emdaer-F06632.svg?style=flat-square)](https://github.com/emdaer/emdaer) [![Maintained with lerna](https://img.shields.io/badge/🐉-maintained%20with%20lerna-cc00ff.svg?style=flat-square)](https://lernajs.io/)
📓 emdaer is a tool for creating and maintaining better READMEs
## What is emdaer?

emdaer lets you to use plugins and transforms within markdown files because READMEs (and other documentation) are crucial files that are often lackluster and/or incomplete and have a tendency to become stale

A couple use cases that illustrate the power of emdaer:

- 🤝 **Keep it in sync** Create templates for use across all of your organizations projects to promote synchronicity and reduce doing the same work over and over
- 🗃 **Keep it organized** Keep your documentation DRY and organized by importing content from your codebase and splitting large documents into chunks
- 🍋 **Keep it fresh** Ensure your documents stay up to date by pulling in new data from various sources with every build

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

## Adding emdaer to your project

We recommend using emdaer with [husky](https://github.com/typicode/husky).

Install dependencies:

```sh
npm install --save-dev @emdaer/cli @emdaer/plugin-value-from-package husky
```

Add a `precommit` script:

```json
  "scripts": {
    "emdaer": "emdaer && git add *.md",
    "precommit": "npm run emdaer"
  }
```

Add a `.emdaer/README.emdaer.md` file:

```md
# <!--emdaer-p
  - '@emdaer/plugin-value-from-package'
  - value: name
-->

```

And give it a whirl:

```sh
npm run emdaer
```

## Core Plugins

- **[@emdaer/plugin-contributors-details-github](packages/plugin-contributors-details-github)** An emdaer plugin to generate contributor details from GitHub
- **[@emdaer/plugin-details](packages/plugin-details)** An emdaer plugin that renders HTML5 details elements, which are disclosure widgets from which users can retrieve additional information.
- **[@emdaer/plugin-documentation](packages/plugin-documentation)** An emdaer plugin to generate documentation from your code comments using documentationjs.
- **[@emdaer/plugin-image](packages/plugin-image)** An emdaer plugin that renders HTML img elements.
- **[@emdaer/plugin-import](packages/plugin-import)** An emdaer plugin that imports content from another file.
- **[@emdaer/plugin-license-reference](packages/plugin-license-reference)** An emdaer plugin that renders license information from the package.
- **[@emdaer/plugin-link](packages/plugin-link)** An emdaer plugin that renders anchor elements.
- **[@emdaer/plugin-list](packages/plugin-list)** An emdaer plugin that renders HTML list element.
- **[@emdaer/plugin-list-lerna-packages](packages/plugin-list-lerna-packages)** An emdaer plugin that generate a list of lerna packages in a project.
- **[@emdaer/plugin-shields](packages/plugin-shields)** an emdaer plugin to generate shields from shields.io
- **[@emdaer/plugin-table](packages/plugin-table)** an emdaer plugin to generate tables
- **[@emdaer/plugin-value-from-package](packages/plugin-value-from-package)** an emdaer plugin to add values from package.json

## Core Transforms

- **[@emdaer/transform-github-emoji](packages/transform-github-emoji)** an emdaer transform to use github flavored emoji codes
- **[@emdaer/transform-smartypants](packages/transform-smartypants)** an emdaer transform to apply smartypants

## Contributing

If you&#8217;d like to make emdaer better, please read our [guide to contributing](./CONTRIBUTING.md).

<details>
<summary><strong>Contributors</strong></summary><br />
<a href="https://github.com/flipactual">
  <img align="left" src="https://avatars0.githubusercontent.com/u/1306968?s=24" />
</a>
<strong>Flip</strong>
<br /><br />
<a title="I build multi-channel publishing systems and web applications at @fourkitchens." href="https://github.com/infiniteluke">
  <img align="left" src="https://avatars0.githubusercontent.com/u/1127238?s=24" />
</a>
<strong>Luke Herrington</strong>
<br /><br />
<a title="Software architect with an interest in distributed systems and elegant solutions." href="https://github.com/elliotttf">
  <img align="left" src="https://avatars0.githubusercontent.com/u/447151?s=24" />
</a>
<strong>Elliott Foster</strong>
<br /><br />
<a href="https://github.com/thebruce">
  <img align="left" src="https://avatars0.githubusercontent.com/u/590058?s=24" />
</a>
<strong>David Diers</strong>
<br /><br />
<a href="https://github.com/fluxsauce">
  <img align="left" src="https://avatars0.githubusercontent.com/u/976391?s=24" />
</a>
<strong>Jon Peck</strong>
<br /><br />
</details>

## License

emdaer is [MIT licensed](./LICENSE).


