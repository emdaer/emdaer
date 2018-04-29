# <!--emdaer-p
  - '@emdaer/plugin-value-from-package'
  - value: name
--> · <!--emdaer-p
  - '@emdaer/plugin-shields'
  - shields:
      - alt: 'Travis'
        image: 'travis/emdaer/emdaer.svg'
        link: 'https://travis-ci.org/emdaer/emdaer/'
        style: 'flat-square'
      - alt: 'Documented with emdaer'
        image: 'badge/📓-documented%20with%20emdaer-F06632.svg'
        link: 'https://github.com/emdaer/emdaer'
        style: 'flat-square'
      - alt: 'Maintained with lerna'
        image: 'badge/🐉-maintained%20with%20lerna-cc00ff.svg'
        link: 'https://lernajs.io/'
        style: 'flat-square'
-->

<!--emdaer-p
  - '@emdaer/plugin-value-from-package'
  - value: description
-->

## Usage

<!--emdaer-p
   - '@emdaer/plugin-value-from-package'
   - value: name
--> is an [emdaer](https://github.com/emdaer/emdaer/) transform – see the [emdaer monorepo](https://github.com/emdaer/emdaer/) for more information

## Documentation

### Example
:100:

<!--emdaer-t
  - '@emdaer/transform-github-emoji'
-->

### Usage in README

```md
<!--emdaer-p 
  - '@emdaer/plugin-jsdoc-tag-value'
  - source: ./src/index.js
    functionName: githubEmojiTransform
    tag: example
-->
```

<!--emdaer-p
  - '@emdaer/plugin-documentation'
  - sources:
    - ./src/index.js
-->
