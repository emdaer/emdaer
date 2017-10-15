## Adding emdaer to your project

We recommend using emdaer with [husky](https://github.com/typicode/husky).

Install dependencies:

```sh
npm install --save-dev @emdaer/cli @emdaer/plugin-value-from-package husky
```

Add a `prepublish` script:

```json
  "scripts": {
    "emdaer": "emdaer && git add *.md",
    "prepublish": "npm run emdaer"
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
