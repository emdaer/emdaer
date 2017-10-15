## Plugins & Transforms

When creating a plugin or transform, any dependencies must be stubbed for flow.

First try:

```sh
flow-typed install dependency-name@x.x.x
```

Then, if the libdef doesn't exist:

```sh
flow-typed create-stub dependency-name@x.x.x
```
