export FORCE_COLOR = true

precommit: lint-staged type test emdaer

ci: bootstrap lint type test

bootstrap:
	./node_modules/.bin/lerna bootstrap
emdaer:
	./node_modules/.bin/emdaer
	./node_modules/.bin/lerna exec -- emdaer
	git add *.md
	git add packages/*/*.md
lint:
	./node_modules/.bin/eslint .
lint-staged:
	./node_modules/.bin/lint-staged
publish:
	./node_modules/.bin/lerna publish
test:
	./node_modules/.bin/jest
type:
	./node_modules/.bin/flow status
