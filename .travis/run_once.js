#!/usr/bin/env node

const deployOnce = require('travis-deploy-once');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function runOnce() {
  const command = process.argv[2];
  if (!process.env.TRAVIS_PULL_REQUEST) {
    return Promise.reject(`Skipping "${command}". Not a PR build.`);
  }
  const result = await deployOnce({
    GH_TOKEN: process.env.RELEASE_GH_TOKEN,
  });
  if (result === true) {
    let stdout, stderr;
    try {
      await exec(command);
    } catch (e) {
      return Promise.reject(e);
    }
    return Promise.resolve(`Successfully ran "${command}"`);
  } else if (result === false) {
    return Promise.reject('Some job(s) failed');
  } else if (result === null) {
    return Promise.reject('Did not run as the build leader');
  }
}

module.exports = runOnce;

(async () => {
  try {
    await module.exports();
  } catch (e) {
    console.error(e);
  }
})();
