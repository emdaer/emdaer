#!/usr/bin/env node

const emdaer = require('@emdaer/core');
const EmdaerFeatureFlags = require('@emdaer/core/lib/EmdaerFeatureFlags');

const program = require('commander');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const { outputFile, readFile } = require('fs-extra');

const logger = require('./_logger');
const { version } = require('../package.json');
const { NO_MATCHING_FILES, EMDAER_FAILED } = require('./_errors');
const getEnabledFeatureFlags = require('./util/getEnabledFeatureFlags');

module.exports = async function cli(args = process.argv) {
  let exitCode = 0;
  program.version(version).parse(args);

  const origins = await glob('.emdaer/**/*.emdaer.md');

  if (!origins) {
    logger.warn(NO_MATCHING_FILES);
  } else {
    const enabledFeatureFlags = getEnabledFeatureFlags(EmdaerFeatureFlags);
    if (enabledFeatureFlags) {
      logger.log(`The following flags are enabled: ${enabledFeatureFlags} 🚩`);
    }

    const { name } = JSON.parse(await readFile('package.json', 'utf8'));
    await Promise.all(
      origins.map(origin =>
        (async () => {
          try {
            const [, fileName, fileExtension] = origin.match(
              /\.emdaer\/(.*)\.emdaer(\.md)/
            );
            const destination = `${fileName}${fileExtension}`;
            logger.log(`Writing ${destination} for ${name} 👌`);
            await outputFile(
              destination,
              await emdaer(origin, (await readFile(origin)).toString())
            );
          } catch (error) {
            logger.error(EMDAER_FAILED, error);
            exitCode = 1;
          }
        })()
      )
    );
  }

  return exitCode;
};

module.exports();
