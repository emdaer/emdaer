#!/usr/bin/env node

/* eslint-disable no-console */

const CONTRIBUTORS_DATA_FILE =
  './.emdaer/.offline/plugin-contributors-details-github/contributors-data.json';

console.log(
  `🌐  This plugin makes requests to the GitHub API and caches responses at ${CONTRIBUTORS_DATA_FILE}.
If you are using emdaer in a precommit hook, make sure you add \`git add ./.emdaer/.offline\` to the respective script.`
);
