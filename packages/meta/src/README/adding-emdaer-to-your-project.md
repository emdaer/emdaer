## Adding emdaer to your project

We recommend using emdaer with [lint-staged](https://github.com/okonet/lint-staged) and [husky](https://github.com/typicode/husky).

Install dependencies:

```sh
npm install --save-dev @emdaer/cli @emdaer/plugin-value-from-package lint-staged husky
```
or with [yarn](https://yarnpkg.com/):
```sh
yarn add @emdaer/cli @emdaer/plugin-value-from-package lint-staged husky -D
```

Follow the [lint-staged setup instructions](https://github.com/okonet/lint-staged#installation-and-setup).

```diff
{
  "scripts": {
+   "emdaer": "emdaer && git add *.md",
+   "precommit": "lint-staged"
  }
}
```

In your lint-staged config file add an entry for emdaer:

```diff
module.exports = {
  '*.js': ['eslint --fix', 'prettier --write', 'git add'],
+ '*.emdaer.md': ['emdaer --yes', 'git add'],
};
```

NOTE: In the case of a `precommit` hook (or CI/other automation), we don't want to be prompted about anything. The `--yes` flag will automatically answer "yes" to any prompts. For example, it will make emdaer write your READMEs without prompting about overwritting direct changes to a destination README file.

Add a `.emdaer/README.emdaer.md` file:

<!-- prettier-ignore-start -->
```md
# <!--emdaer-p
  - '@emdaer/plugin-value-from-package'
  - value: name
-->
```
<!-- prettier-ignore-end -->

And give it a whirl:

```sh
npm run emdaer
```

When you commit your changes, lint-staged will run emdaer on any `*.emdaer.md` files you may have changed.

### Manual Usage

emdaer can be run manually against files by providing space separated file paths:
```sh
npm run emdaer -- .emdaer/README.emdaer.md .emdaer/CONTRIBUTING.emdaer.md
```
If emdaer is not provided a path, the default glob `.emdaer/**/*.emdaer.md` is searched:
```sh
npm run emdaer
```

_NOTE:_ By default, emdaer checks for existing changes to your READMEs before writing. If it detects changes, it will provide a prompt asking if you would like to overwrite the README with the newly generated content. If you accidentally edited the README directly, you will want to answer `n` to the prompt, move any changes to the respective `.emdaer/*.emdaer.md` file, and rerun emdaer. If you would like to discard those changes, answer `Y` to the prompt or use the `--yes` flag to skip the prompt all together. In both cases, emdaer will overwrite the README with the newly generated content.
