jest.mock('util', () => ({
  promisify: fn => fn,
}));
jest.mock('glob');
jest.mock('fs-extra');
jest.mock('./_logger');
jest.mock('@emdaer/core');

const glob = require('glob');
const fs = require('fs-extra');
const logger = require('./_logger');

const { NO_MATCHING_FILES, EMDAER_FAILED } = require('./_errors');

const bin = require('./');

describe('@emdaer/cli', () => {
  test('logs warning when there are no matching files', async () => {
    const exitCode = await bin();
    expect(logger.warn).toHaveBeenLastCalledWith(NO_MATCHING_FILES);
    expect(exitCode).toBe(0);
  });
  test('logs error when emdaer fails', async () => {
    glob.mockImplementation(() => ['./.emdaer/README.emdaer.md']);
    fs.readFile.mockImplementation(() => {
      throw new Error();
    });
    const exitCode = await bin();
    expect(logger.error).toHaveBeenLastCalledWith(
      EMDAER_FAILED,
      expect.anything()
    );
    expect(exitCode).toBe(1);
  });
  test('logs happy message on success', async () => {
    glob.mockImplementation(() => ['./.emdaer/README.emdaer.md']);
    fs.readFile.mockImplementation(() => '');
    fs.outputFile.mockImplementation(() => {});
    const exitCode = await bin();
    expect(logger.log).toHaveBeenLastCalledWith('Writing README.md 👌');
    expect(exitCode).toBe(0);
  });
});
