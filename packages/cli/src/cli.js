/* @flow */

const emdaer = require('@emdaer/core');

const program = require('commander');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const { outputFile, readFile, readJson } = require('fs-extra');
const { merge } = require('rxjs/observable/merge');
const { from } = require('rxjs/observable/from');
const { scan, map, partition } = require('rxjs/operators');
const inquirer = require('inquirer');

const addStamp = require('./util/addStamp');
const addHash = require('./util/addHash');
const generateHash = require('./util/generateHash');
const getHashDiff = require('./util/getHashDiff');
const logger = require('./util/logger');
const { version } = require('../package.json');
const { NO_MATCHING_FILES, EMDAER_FAILED } = require('./errors');

module.exports = async function cli(args: Array<string> = process.argv) {
  let exitCode = 0;
  program
    .version(version)
    .option('-y, --yes', 'answer yes too all prompts')
    .parse(args);

  const origins = await glob('.emdaer/**/*.emdaer.md');
  if (!origins) {
    logger.warn(NO_MATCHING_FILES);
  } else {
    const { name } = await readJson('package.json');
    const [needsPrompt, passThrough] = from(origins).pipe(
      map(async origin => {
        const [, fileName, fileExtension] = origin.match(
          /\.emdaer\/(.*)\.emdaer(\.md)/
        );
        const destination = `${fileName}${fileExtension}`;
        const [storedHash, existingContentHash] = await getHashDiff(
          destination
        );
        const diffDetected = storedHash !== existingContentHash;
        return {
          origin,
          destination,
          diffDetected,
          storedHash,
          existingContentHash,
          skip: false,
        };
      }),
      partition(async res => {
        const { diffDetected, origin } = await res;
        console.log(origin);
        return !diffDetected || Boolean(program.yes);
      })
    );
    needsPrompt.pipe(
      scan(async (acc, resPromise) => {
        console.log('lol');
        const res = await resPromise;
        const { overwrite } = await inquirer.prompt({
          name: 'overwrite',
          type: 'confirm',
          default: 'n',
          message: `it appears ${res.fileName}${res.fileExtension} has been changed. You may want to move changes you made manually to ${fileName}.emdaer${fileExtension} instead. Would you like to overwrite the contents of ${fileName}${fileExtension}?` // prettier-ignore
        });
        if (!overwrite) {
          res.skip = true;
        }
        return res;
      })
    );

    merge(passThrough, needsPrompt)
      .pipe(
        map(async res => {
          const {
            origin,
            destination,
            diffDetected,
            storedHash,
            skip,
          } = await res;
          console.log({ skip });
          if (skip) {
            logger.warn(`skipping ${destination} of ${name}. ↩️`);
            return Promise.resolve();
          }
          const contents = await emdaer(
            origin,
            (await readFile(origin)).toString()
          );
          const newHash = generateHash(contents);
          if (newHash === storedHash && !diffDetected) {
            logger.warn(
              `no changes for ${destination} of ${name}. skipping. ↩️`
            );
            return Promise.resolve();
          }
          logger.log(`writing ${destination} for ${name} 👌`);
          return outputFile(
            destination,
            await addStamp(await addHash(contents), origin)
          );
        })
      )
      .toPromise()
      .then(() => 0)
      .catch(error => {
        console.log(error);
        logger.error(EMDAER_FAILED, error);
        return 1;
      });
  }
  return exitCode;
};
