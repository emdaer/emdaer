/* @flow */

const program = require('commander');
// 💩
const { promisify } = require('util');
const glob = promisify(require('glob'));
const { outputFile, readFile, readJson, pathExists } = require('fs-extra');
const inquirer = require('inquirer');
const Promise = require('bluebird');

const addStamp = require('./util/addStamp');
const addHash = require('./util/addHash');
const generateHash = require('./util/generateHash');
const getHashDiff = require('./util/getHashDiff');
const logger = require('./util/logger');
const { version } = require('../package.json');
const { NO_MATCHING_FILES, EMDAER_FAILED } = require('./errors');

module.exports = async function cli(
  emdaer: (
    origin: string,
    content: string,
    options?: {
      [string]: any,
    }
  ) => Promise<string>,
  args: Array<string> = process.argv
) {
  let exitCode = 0;
  program
    .version(version)
    .option(
      '-p, --path <glob>',
      'globbed path in which to search for emdaer files.'
    )
    .option('-y, --yes', 'answer "yes" too all prompts')
    .parse(args);

  const globPath = '.emdaer/**/*.emdaer.md';
  let origins = [];
  if (program.args.length > 0) {
    (await Promise.all(program.args.map(pathExists))).forEach(
      (exists, index) => {
        if (!exists) {
          logger.warn(NO_MATCHING_FILES(program.args[index]));
        } else {
          origins.push(program.args[index]);
        }
      }
    );
  } else {
    origins = await glob(globPath);
  }
  const { name } = await readJson('package.json');
  if (!origins.length) {
    logger.warn(
      NO_MATCHING_FILES(
        program.args.length ? program.args.join(', ') : globPath
      )
    );
  } else {
    try {
      const filesMeta = await Promise.mapSeries(origins, async origin => {
        let skip = false;
        const [, basePath, fileName, fileExtension] = origin.match(
          /(.*)\.emdaer\/(.*)\.emdaer(\.md)/
        );
        const destination = `${basePath}${fileName}${fileExtension}`;
        const [storedHash, existingContentHash] = await getHashDiff(
          destination
        );
        const diff = storedHash !== existingContentHash;
        if (diff && !program.yes) {
          const { overwrite } = await inquirer.prompt({
            name: 'overwrite',
            type: 'confirm',
            default: 'n',
            message: `it appears ${fileName}${fileExtension} has been changed. You may want to move changes you made manually to ${fileName}.emdaer${fileExtension} instead.\nWould you like to overwrite the contents of ${fileName}${fileExtension}?` // prettier-ignore
          });
          skip = !overwrite;
        }
        return {
          origin,
          destination,
          diff,
          storedHash,
          existingContentHash,
          skip,
        };
      });
      await Promise.map(
        filesMeta,
        async ({ origin, destination, diff, storedHash, skip }) => {
          if (skip) {
            logger.warn(`skipping ${destination} for ${name} ↩️`);
            return Promise.resolve();
          }
          const re = await readFile(origin);
          const contents = await emdaer(origin, re.toString());
          const newHash = generateHash(contents);
          if (newHash === storedHash && !diff) {
            logger.warn(
              `no changes for ${destination} for ${name}. skipping ↩️`
            );
            return Promise.resolve();
          }
          logger.log(`writing ${destination} for ${name} 👌`);
          return outputFile(
            destination,
            await addStamp(await addHash(contents), origin)
          );
        }
      );
    } catch (e) {
      logger.error(`${EMDAER_FAILED}\n${e}`);
      exitCode = 1;
    }
  }
  return exitCode;
};
