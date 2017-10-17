export FORCE_COLOR = true

precommit: lint-staged type test emdaer

bootstrap:
	lerna bootstrap
emdaer:
	emdaer
	git add *.md
lint:
	eslint .
lint-staged:
	lint-staged
publish:
	lerna publish
test:
	jest
type:
	flow status
