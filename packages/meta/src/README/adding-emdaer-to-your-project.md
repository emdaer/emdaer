## Adding emdaer to your project

We recommend using emdaer with [husky](https://github.com/typicode/husky).

Install dependencies:

```sh
npm install --save-dev @emdaer/cli @emdaer/plugin-value-from-package husky
```

Add a `precommit` script:

```json
{
  "scripts": {
    "emdaer": "emdaer && git add *.md",
    "precommit": "npm run emdaer"
  }
}
```

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