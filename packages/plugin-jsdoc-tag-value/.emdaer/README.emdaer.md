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

## Usage

<!--emdaer-p
   - '@emdaer/plugin-value-from-package'
   - value: name
--> is an [emdaer](https://github.com/emdaer/emdaer/) plugin – see the [emdaer monorepo](https://github.com/emdaer/emdaer/) for more information

## Documentation

### Example
This will print 2 examples of how to use this plugin:

```md
<!--emdaer-p
  - '@emdaer/plugin-jsdoc-tag-value'
  - source: ./src/index.js
    functionName: jsdocTagValue
    tag: example
-->
```

### Usage in README

Use `<!--emdaer-p
  - '@emdaer/plugin-value-from-package'
  - value: name
-->` by specifying the `source`, `functionName`, and `tag` you would like to pull the string value from. `<!--emdaer-p
  - '@emdaer/plugin-value-from-package'
  - value: name
-->` will pull the `description` from documentationjs of the first instance of that tag. This readme is pulling in an example of itself like so:

```md
<!--emdaer-p
  - '@emdaer/plugin-jsdoc-tag-value'
  - source: ./src/index.js
    functionName: jsdocTagValue
    tag: example
    tagIndex: 0
-->
```
By omitting the `tagIndex` parameter, one can pull in all examples for a given function:
```md
<!--emdaer-p
  - '@emdaer/plugin-jsdoc-tag-value'
  - source: ./src/index.js
    functionName: jsdocTagValue
    tag: example
    tagIndex: 1
-->
```

## Node API

<!--emdaer-p
  - '@emdaer/plugin-documentation'
  - sources:
    - ./src/index.js
-->
