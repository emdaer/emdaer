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

### Offline Support
In order to ensure emdaer works properly offline, if your plugin makes API requests or relies on a connection of any kind, please cache the response data under `.emdaer/.offline`, and namespace it with the plugin name.
```
.emdaer/.offline/plugin-my-new-plugin/response-data.json
```
Read this file when your API request fails and write to this file when your request is successful. For an example, check out `plugin-contributors-details-github`.
