#!/usr/bin/env node

const emdaer = require('@emdaer/core');
const EmdaerFeatureFlags = require('@emdaer/core/lib/EmdaerFeatureFlags');

const program = require('commander');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const { outputFile, readFile } = require('fs-extra');
const { Observable } = require('rxjs/Observable');

require('rxjs/add/observable/from');
require('rxjs/add/operator/map');
require('rxjs/add/operator/mergeAll');

const logger = require('./_logger');
const { version } = require('../package.json');
const { NO_MATCHING_FILES, EMDAER_FAILED } = require('./_errors');
const getEnabledFeatureFlags = require('./util/getEnabledFeatureFlags');

module.exports = async function cli(args = process.argv) {
  let exitCode = 0;
  program
    .version(version)
    .option('--AST', 'Enable experimental AST parsing')
    .parse(args);

  const origins = await glob('.emdaer/**/*.emdaer.md');

  if (!origins) {
    logger.warn(NO_MATCHING_FILES);
  } else {
    if (program.AST) {
      EmdaerFeatureFlags.override('enableASTAndCommonComment', true);
    }

    const enabledFeatureFlags = getEnabledFeatureFlags(EmdaerFeatureFlags);
    if (enabledFeatureFlags) {
      logger.log(`The following flags are enabled: ${enabledFeatureFlags} 🚩`);
    }

    const { name } = JSON.parse(await readFile('package.json', 'utf8'));
    exitCode = await Observable.from(origins)
      .map(async origin => emdaer(origin, (await readFile(origin)).toString()))
      .mergeAll()
      .map(async (readme, index) => {
        const [, fileName, fileExtension] = origins[index].match(
          /\.emdaer\/(.*)\.emdaer(\.md)/
        );
        const destination = `${fileName}${fileExtension}`;
        logger.log(`Writing ${destination} for ${name} 👌`);
        return outputFile(destination, readme);
      })
      .toPromise()
      .then(() => 0)
      .catch(error => {
        logger.error(EMDAER_FAILED, error);
        return 1;
      });
  }
  return exitCode;
};

module.exports();
