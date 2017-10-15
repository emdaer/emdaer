#!/usr/bin/env node

const { outputFile, readFile } = require('fs-extra');
const program = require('commander');
const emdaer = require('@emdaer/core');
const { promisify } = require('util');
const glob = promisify(require('glob'));

const { NO_MATCHING_FILES, EMDAER_FAILED } = require('./_errors');
const logger = require('./_logger');
const { version } = require('../package.json');

module.exports = async function cli(args = process.argv) {
  let exitCode = 0;
  program.version(version).parse(args);

  const origins = await glob('.emdaer/**/*.emdaer.md');

  if (!origins) {
    logger.warn(NO_MATCHING_FILES);
  } else {
    await Promise.all(
      origins.map(origin =>
        (async () => {
          try {
            const [, name, extension] = origin.match(
              /\.emdaer\/(.*)\.emdaer(\.md)/
            );
            const destination = `${name}${extension}`;
            logger.log(`Writing ${destination} 👌`);
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
