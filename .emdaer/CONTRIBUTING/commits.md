## Commits

All commit messages must follow the [Conventional Commits Specification](https://conventionalcommits.org/) which can be descibed like so:

```
type(scope?): subject
body?
footer?
```

[Commitlint](https://github.com/marionebl/commitlint) is setup to enforce this convention.

### Commitlint Rules:
- [@commitlint/config-angular](https://github.com/marionebl/commitlint/tree/master/@commitlint/config-angular#rules): Enforces common "types" , casing, length rules etc..
- [@commitlint/config-lerna-scopes](https://github.com/marionebl/commitlint/blob/master/@commitlint/config-lerna-scopes): Ensures the "scope" portion matches one of the emdaer packages. Example: `fix(plugin-image): Add more cat pics`. Generic commits that do not affect a plugin or transform should have no scope like `chore: Do something generic`.

### Suggestions:
If your commit fixes an issue, mention the issue number in your commit body or footer [as recommended by GitHub](https://help.github.com/articles/closing-issues-using-keywords/).

Example:
```
fix(plugin-image): Add more cat pics
Closes #123, Closes #456
```