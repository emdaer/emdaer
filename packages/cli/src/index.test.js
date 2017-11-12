jest.mock('@emdaer/core', () => () => {});
jest.mock('@emdaer/core/lib/EmdaerFeatureFlags');

jest.mock('util', () => ({
  promisify: fn => fn,
}));
jest.mock('glob');
jest.mock('fs-extra');

jest.mock('./_logger');
jest.mock('./util/getEnabledFeatureFlags');

const glob = require('glob');
const fs = require('fs-extra');
const logger = require('./_logger');
const getEnabledFeatureFlags = require('./util/getEnabledFeatureFlags');

const { NO_MATCHING_FILES, EMDAER_FAILED } = require('./_errors');

const bin = require('./');

describe('@emdaer/cli', () => {
  test('logs warning when there are no matching files', async () => {
    const exitCode = await bin();
    expect(logger.warn).toHaveBeenLastCalledWith(NO_MATCHING_FILES);
    expect(exitCode).toBe(0);
  });
  test('logs feature flags when they are enabled', async () => {
    glob.mockImplementationOnce(() => ['./.emdaer/README.emdaer.md']);
    getEnabledFeatureFlags.mockImplementationOnce(() => 'theBestFeature');
    fs.readFile.mockImplementationOnce(() => '{"name":"@emdaer/cli"}');
    fs.readFile.mockImplementationOnce(() => '');
    fs.outputFile.mockImplementation(() => {});
    await bin();
    expect(logger.log).toHaveBeenCalledWith(
      'The following flags are enabled: theBestFeature 🚩'
    );
  });
  test('logs error when emdaer fails', async () => {
    glob.mockImplementationOnce(() => ['./.emdaer/README.emdaer.md']);
    fs.readFile.mockImplementationOnce(() => '{"name":"@emdaer/cli"}');
    fs.readFile.mockImplementationOnce(() => {
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
    glob.mockImplementationOnce(() => ['./.emdaer/README.emdaer.md']);
    fs.readFile.mockImplementationOnce(() => '{"name":"@emdaer/cli"}');
    fs.readFile.mockImplementationOnce(() => '');
    fs.outputFile.mockImplementation(() => {});
    const exitCode = await bin();
    expect(logger.log).toHaveBeenLastCalledWith(
      'Writing README.md for @emdaer/cli 👌'
    );
    expect(exitCode).toBe(0);
  });
});
