#!/usr/bin/env node

const emdaer = require('@emdaer/core');

const program = require('commander');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const { outputFile, readFile } = require('fs-extra');
const { Observable } = require('rxjs/Observable');

require('rxjs/add/observable/from');
require('rxjs/add/operator/map');
require('rxjs/add/operator/mergeAll');

const checkDirtyDestination = require('./util/checkDirtyDestination');
const addStamp = require('./util/addStamp');
const logger = require('./util/logger');
const { version } = require('../package.json');
const {
  NO_MATCHING_FILES,
  EMDAER_FAILED,
  makeDirtyDestinationWarning,
} = require('./errors');

module.exports = async function cli(args = process.argv) {
  let exitCode = 0;
  program.version(version).parse(args);

  const origins = await glob('.emdaer/**/*.emdaer.md');

  if (!origins) {
    logger.warn(NO_MATCHING_FILES);
  } else {
    const { name } = JSON.parse(await readFile('package.json', 'utf8'));
    exitCode = await Observable.from(origins)
      .map(async origin => {
        const [, fileName, fileExtension] = origin.match(
          /\.emdaer\/(.*)\.emdaer(\.md)/
        );
        const destination = `${fileName}${fileExtension}`;
        if (await checkDirtyDestination(destination)) {
          logger.warn(makeDirtyDestinationWarning(fileName, fileExtension));
          return Promise.resolve();
        }
        logger.log(`Writing ${destination} for ${name} 👌`);
        return outputFile(
          destination,
          await addStamp(
            await emdaer(origin, (await readFile(origin)).toString()),
            origin
          )
        );
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
