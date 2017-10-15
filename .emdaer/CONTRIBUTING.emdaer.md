# Contributing

<!--emdaer-p
  - '@emdaer/plugin-import'
  - path: .emdaer/CONTRIBUTING/code-of-conduct.md
-->

<!--emdaer-p
  - '@emdaer/plugin-import'
  - path: .emdaer/CONTRIBUTING/getting-setup.md
-->

<!--emdaer-p
  - '@emdaer/plugin-import'
  - path: .emdaer/CONTRIBUTING/testing-and-linting.md
-->

### Plugins & Transforms

When creating a plugin or transform, any dependencies must be stubbed for flow.

First try:

```sh
flow-typed install dependency-name@x.x.x
```

Then, if the libdef doesn't exist:

```sh
flow-typed create-stub dependency-name@x.x.x
```

<!--emdaer-t
  - '@emdaer/transform-smartypants'
-->
