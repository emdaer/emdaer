#!/usr/bin/env node

const deployOnce = require('travis-deploy-once');
const util = require('util');
const spawn = require('child_process').spawn;

async function runOnce() {
  return new Promise(async (resolve, reject) => {
    const command = process.argv[2];
    if (!process.env.TRAVIS_PULL_REQUEST) {
      return reject(`Skipping "${command}". Not a PR build.`);
    }
    const result = await deployOnce({
      GH_TOKEN: process.env.RELEASE_GH_TOKEN,
    });
    if (result === true) {
      let proc;
      try {
        const [executable, ...args] = command.split(' ');
        proc = spawn(executable, args, { stdio: 'inherit' });
      } catch (e) {
        return reject(e);
      }
      proc.on('close', code => {
        return resolve(`Ran "${command}" with exit code ${code}`);
      });
    } else if (result === false) {
      return reject('Some job(s) failed');
    } else if (result === null) {
      return reject('Did not run as the build leader');
    }
  });
}

module.exports = runOnce;

(async () => {
  try {
    console.log('✅ ', await module.exports());
  } catch (e) {
    console.error('❌ ', e);
  }
})();
