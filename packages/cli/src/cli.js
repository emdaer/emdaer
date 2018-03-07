const emdaer = require('@emdaer/core');

const program = require('commander');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const { outputFile, readFile, readJson } = require('fs-extra');
const { Observable } = require('rxjs/Observable');
const inquirer = require('inquirer');

require('rxjs/add/observable/from');
require('rxjs/add/operator/map');
require('rxjs/add/operator/mergeAll');

const checkDirtyDestination = require('./util/checkDirtyDestination');
const addStamp = require('./util/addStamp');
const logger = require('./util/logger');
const { version } = require('../package.json');
const { NO_MATCHING_FILES, EMDAER_FAILED } = require('./errors');

module.exports = async function cli(args = process.argv) {
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
    exitCode = await Observable.from(origins)
      .map(async origin => {
        const [, fileName, fileExtension] = origin.match(
          /\.emdaer\/(.*)\.emdaer(\.md)/
        );
        const destination = `${fileName}${fileExtension}`;
        if (!program.yes && (await checkDirtyDestination(destination))) {
          const { overwrite } = await inquirer.prompt({
            name: 'overwrite',
            type: 'confirm',
            default: 'n',
            message: `it appears ${fileName}${fileExtension} has been changed. You may want to move changes you made manually to ${fileName}.emdaer${fileExtension} instead. Would you like to overwrite the contents of ${fileName}${fileExtension}?`,
          });
          if (!overwrite) {
            logger.warn(`skipping ${destination} for ${name} ↩️`);
            return Promise.resolve();
          }
        }
        logger.log(`writing ${destination} for ${name} 👌`);
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
