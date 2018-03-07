jest.mock('@emdaer/core', () => () => {});

jest.mock('util', () => ({
  promisify: fn => fn,
  deprecate: fn => fn,
  inherits: fn => fn,
}));
jest.mock('glob');
jest.mock('fs-extra');
jest.mock('execa');
jest.mock('inquirer');

jest.mock('./util/logger');

const glob = require('glob');
const fs = require('fs-extra');
const execa = require('execa');
const inquirer = require('inquirer');
const logger = require('./util/logger');
const bin = require('./cli');

const { NO_MATCHING_FILES, EMDAER_FAILED } = require('./errors');

describe('@emdaer/cli', () => {
  test('logs warning when there are no matching files', async () => {
    const exitCode = await bin();
    expect(logger.warn).toHaveBeenLastCalledWith(NO_MATCHING_FILES);
    expect(exitCode).toBe(0);
  });
  test('logs error when emdaer fails', async () => {
    glob.mockImplementationOnce(() => ['./.emdaer/README.emdaer.md']);
    fs.readJson.mockImplementationOnce(() => ({ name: '@emdaer/cli' }));
    execa.mockImplementationOnce(() => Promise.reject());
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
  test('skips prompt if destination is not dirty', async () => {
    glob.mockImplementationOnce(() => ['./.emdaer/README.emdaer.md']);
    fs.readJson.mockImplementationOnce(() => ({ name: '@emdaer/cli' }));
    fs.readFile.mockImplementation(() => '');
    execa.mockImplementationOnce(() => Promise.resolve({ stdout: 'true' }));
    execa.mockImplementationOnce(() => Promise.resolve({ stdout: '' }));
    fs.outputFile.mockImplementation(() => {});
    const exitCode = await bin();
    expect(inquirer.prompt).not.toBeCalled();
    expect(exitCode).toBe(0);
  });
  test('warns when overwriting was skipped', async () => {
    glob.mockImplementationOnce(() => ['./.emdaer/README.emdaer.md']);
    fs.readJson.mockImplementationOnce(() => ({ name: '@emdaer/cli' }));
    execa.mockImplementationOnce(() => Promise.resolve({ stdout: 'true' }));
    execa.mockImplementationOnce(() =>
      Promise.resolve({
        stdout: 'M README.md',
      })
    );
    jest
      .spyOn(inquirer, 'prompt')
      .mockImplementationOnce(() => Promise.resolve({ overwrite: false }));

    const exitCode = await bin();
    expect(logger.warn).toHaveBeenLastCalledWith(
      'skipping README.md for @emdaer/cli ↩️'
    );
    expect(exitCode).toBe(0);
  });
  test('warns when overwriting was skipped', async () => {
    glob.mockImplementationOnce(() => ['./.emdaer/README.emdaer.md']);
    fs.readJson.mockImplementationOnce(() => ({ name: '@emdaer/cli' }));
    execa.mockImplementationOnce(() => Promise.resolve({ stdout: 'true' }));
    execa.mockImplementationOnce(() =>
      Promise.resolve({
        stdout: 'M README.md',
      })
    );
    jest
      .spyOn(inquirer, 'prompt')
      .mockImplementationOnce(() => Promise.resolve({ overwrite: true }));
    fs.outputFile.mockImplementation(() => {});

    const exitCode = await bin();
    expect(logger.warn).toHaveBeenLastCalledWith(
      'skipping README.md for @emdaer/cli ↩️'
    );
    expect(exitCode).toBe(0);
  });
  test('if provided with --yes, it skips dirty destination check and respective prompt', async () => {
    glob.mockImplementationOnce(() => ['./.emdaer/README.emdaer.md']);
    fs.readJson.mockImplementationOnce(() => ({ name: '@emdaer/cli' }));
    fs.readFile.mockImplementationOnce(() => '');
    const exitCode = await bin([
      '/Users/infiniteluke/.config/fnm/bin/node',
      '/Users/infiniteluke/code/oss/emdaer/node_modules/.bin/emdaer',
      '--yes',
    ]);
    // expect(inquirer.prompt).not.toBeCalled();
    expect(exitCode).toBe(0);
  });
  test('logs happy message on success', async () => {
    glob.mockImplementationOnce(() => ['./.emdaer/README.emdaer.md']);
    fs.readJson.mockImplementationOnce(() => ({ name: '@emdaer/cli' }));
    fs.readFile.mockImplementationOnce(() => '');
    execa.mockImplementationOnce(() => Promise.resolve({ stdout: 'true' }));
    execa.mockImplementationOnce(() =>
      Promise.resolve({ stdout: 'M NOPE.md' })
    );
    fs.outputFile.mockImplementation(() => {});
    const exitCode = await bin();
    expect(logger.log).toHaveBeenLastCalledWith(
      'writing README.md for @emdaer/cli 👌'
    );
    expect(exitCode).toBe(0);
  });
  test('stamps the file', async () => {
    glob.mockImplementationOnce(() => ['./.emdaer/README.emdaer.md']);
    fs.readJson.mockImplementationOnce(() => ({ name: '@emdaer/cli' }));
    fs.readFile.mockImplementationOnce(() => '');
    execa.mockImplementationOnce(() => Promise.resolve({ stdout: 'true' }));
    execa.mockImplementationOnce(() => Promise.resolve({ stdout: '' }));
    fs.outputFile.mockImplementation(() => {});
    const exitCode = await bin();
    expect(fs.outputFile).toHaveBeenLastCalledWith(
      'README.md',
      `<!--
  This file was generated by emdaer

  Its template can be found at ./.emdaer/README.emdaer.md
-->

undefined`
    );
    expect(exitCode).toBe(0);
  });
});
