jest.mock('util', () => ({
  promisify: fn => fn,
  deprecate: fn => fn,
  inherits: fn => fn,
}));
jest.mock('glob');
jest.mock('fs-extra');
jest.mock('inquirer');

jest.mock('./util/logger');

const glob = require('glob');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const logger = require('./util/logger');
const cli = require('./cli');

const { NO_MATCHING_FILES, EMDAER_FAILED } = require('./errors');

describe('@emdaer/cli', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test('logs warning when there are no matching files', async () => {
    glob.mockReturnValue([]);
    fs.readJson.mockImplementationOnce(() => ({
      name: '@emdaer/cli',
    }));
    const exitCode = await cli(jest.fn().mockImplementation(() => ''));
    expect(logger.warn).toHaveBeenLastCalledWith(
      NO_MATCHING_FILES('.emdaer/**/*.emdaer.md')
    );
    expect(exitCode).toBe(0);
  });
  test('logs error when emdaer fails', async () => {
    const loggedError = 'Emdaer is broken';
    glob.mockReturnValue(['./.emdaer/README.emdaer.md']);
    fs.readJson.mockImplementationOnce(() => ({
      name: '@emdaer/cli',
    }));
    fs.readFile.mockImplementation(() => '');
    jest.spyOn(inquirer, 'prompt').mockImplementationOnce(() => ({
      overwrite: true,
    }));
    const emdaerMock = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error(loggedError)));
    const exitCode = await cli(emdaerMock);
    expect(logger.error).toBeCalledWith(
      `${EMDAER_FAILED}Error: ${loggedError}`
    );
    expect(exitCode).toBe(1);
  });
  test('skips prompt if destination is not dirty', async () => {
    glob.mockReturnValue(['./.emdaer/README.emdaer.md']);
    fs.readJson.mockImplementationOnce(() => ({
      name: '@emdaer/cli',
    }));
    fs.readFile.mockImplementationOnce(
      () => 'emdaerHash:d41d8cd98f00b204e9800998ecf8427e'
    );
    fs.readFile.mockImplementationOnce(() => '');
    fs.outputFile.mockImplementation(() => {});
    const emdaerMock = jest.fn().mockImplementation(() => '');
    const exitCode = await cli(emdaerMock);
    expect(inquirer.prompt).not.toBeCalled();
    expect(exitCode).toBe(0);
  });
  test('warns when overwriting was skipped', async () => {
    glob.mockReturnValue(['./.emdaer/README.emdaer.md']);
    fs.readJson.mockImplementationOnce(() => ({
      name: '@emdaer/cli',
    }));
    fs.readFile.mockImplementationOnce(() => 'emdaerHash:doesnotmatch');
    jest.spyOn(inquirer, 'prompt').mockImplementationOnce(() => ({
      overwrite: false,
    }));
    const emdaerMock = jest.fn().mockImplementation(() => '');
    const exitCode = await cli(emdaerMock);
    expect(logger.warn).toHaveBeenLastCalledWith(
      'skipping README.md for @emdaer/cli ↩️'
    );
    expect(exitCode).toBe(0);
  });
  test('overwrites when prompt is answered true', async () => {
    glob.mockReturnValue(['./.emdaer/README.emdaer.md']);
    fs.readJson.mockImplementationOnce(() => ({
      name: '@emdaer/cli',
    }));
    fs.readFile.mockImplementationOnce(() => 'emdaerHash:doesnotmatch');
    jest.spyOn(inquirer, 'prompt').mockImplementationOnce(() => ({
      overwrite: false,
    }));
    fs.outputFile.mockImplementation(() => {});

    const emdaerMock = jest.fn().mockImplementation(() => '');
    const exitCode = await cli(emdaerMock);
    expect(inquirer.prompt).toBeCalled();
    expect(exitCode).toBe(0);
  });
  test('if provided with --yes, it skips dirty destination check and respective prompt', async () => {
    glob.mockReturnValue(['./.emdaer/README.emdaer.md']);
    fs.readJson.mockImplementationOnce(() => ({
      name: '@emdaer/cli',
    }));
    fs.readFile.mockImplementation(() => '');
    const emdaerMock = jest.fn().mockImplementation(() => '');
    const exitCode = await cli(emdaerMock, [
      '/Users/path/to/node',
      '/Users/path/to/node_modules/.bin/emdaer',
      '--yes',
    ]);
    expect(inquirer.prompt).not.toBeCalled();
    expect(exitCode).toBe(0);
  });
  test('logs happy message on success', async () => {
    glob.mockReturnValue(['./.emdaer/README.emdaer.md']);
    fs.readJson.mockImplementationOnce(() => ({
      name: '@emdaer/cli',
    }));
    fs.readFile.mockImplementationOnce(() => '');
    fs.readFile.mockImplementationOnce(() => '# Hello World');
    fs.outputFile.mockImplementation(() => {});
    const emdaerMock = jest.fn().mockImplementation(() => '');
    const exitCode = await cli(emdaerMock, [
      '/Users/path/to/node',
      '/Users/path/to/node_modules/.bin/emdaer',
      '--yes',
    ]);
    expect(emdaerMock).toBeCalledWith(
      './.emdaer/README.emdaer.md',
      '# Hello World'
    );
    expect(logger.log).toBeCalledWith('writing README.md for @emdaer/cli 👌');
    expect(exitCode).toBe(0);
  });
  test('if destination file is not found, prompt is not called', async () => {
    glob.mockReturnValue(['./.emdaer/README.emdaer.md']);
    fs.readJson.mockImplementationOnce(() => ({
      name: '@emdaer/cli',
    }));
    fs.readFile.mockImplementationOnce(() => {
      throw new Error('could not find file');
    });
    fs.readFile.mockImplementationOnce(() => '');
    fs.outputFile.mockImplementation(() => {});
    const emdaerMock = jest.fn().mockImplementation(() => '');
    const exitCode = await cli(emdaerMock);
    expect(inquirer.prompt).not.toBeCalled();
    expect(exitCode).toBe(0);
  });
  test('if emdaerHash is not found, prompt is not called', async () => {
    glob.mockReturnValue(['./.emdaer/README.emdaer.md']);
    fs.readJson.mockImplementationOnce(() => ({
      name: '@emdaer/cli',
    }));
    fs.readFile.mockImplementationOnce(() => '');
    fs.readFile.mockImplementationOnce(() => '');
    fs.outputFile.mockImplementation(() => {});
    const emdaerMock = jest.fn().mockImplementation(() => '');
    const exitCode = await cli(emdaerMock);
    expect(inquirer.prompt).not.toBeCalled();
    expect(exitCode).toBe(0);
  });
  test('stamps the file', async () => {
    glob.mockReturnValue(['./.emdaer/README.emdaer.md']);
    fs.readJson.mockImplementationOnce(() => ({
      name: '@emdaer/cli',
    }));
    fs.readFile.mockImplementation(() => '');
    fs.outputFile.mockImplementation(() => {});
    const emdaerMock = jest.fn().mockImplementation(() => '# Hello World');
    const exitCode = await cli(emdaerMock);
    expect(fs.outputFile).toHaveBeenLastCalledWith(
      'README.md',
      `<!--
  This file was generated by emdaer

  Its template can be found at ./.emdaer/README.emdaer.md
-->

<!--
  emdaerHash:fc78aa05c9a93d6c42313179fcff2a97
-->

# Hello World`
    );
    expect(exitCode).toBe(0);
  });
});
