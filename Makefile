export FORCE_COLOR = true

.PHONY: precommit commitmsg ci bootstrap install lint lint-staged publish test type commitlint commitlint-ci

precommit: lint-staged type test
commitmsg: commitlint

ci: commitlint-ci bootstrap lint type test

bootstrap:
	./node_modules/.bin/lerna exec "npm install"
	./node_modules/.bin/lerna bootstrap
	yarn install --force
emdaer:
	./node_modules/.bin/emdaer --yes
	./node_modules/.bin/lerna exec -- emdaer --yes
	git add *.md
	git add .emdaer/.offline
	git add packages/*/*.md
install:
	yarn
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
commitlint:
	./node_modules/.bin/commitlint -e ${GIT_PARAMS}
commitlint-ci:
	./node_modules/.bin/commitlint --from="${TRAVIS_BRANCH}" --to="${TRAVIS_COMMIT}"
	./node_modules/.bin/commitlint --from=${TRAVIS_COMMIT}
