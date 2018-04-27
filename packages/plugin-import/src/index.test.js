jest.mock('@emdaer/core');
jest.mock('fs-extra');
jest.mock('./util/getMarkdownPaths');

const { join, sep } = require('path');
const emdaer = require('@emdaer/core');
const nodePackagePlugin = require('./');
const { readFile, pathExists } = require('fs-extra');

const getMarkdownPaths = require('./util/getMarkdownPaths');

describe('@emdaer/plugin-import', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test('loads core module', async () => {
    const path = 'module';
    jest.doMock(path, () => 'cool');
    expect(await nodePackagePlugin({ path })).toBe('cool');
  });
  test('loads relative module', async () => {
    const projectDir = process
      .cwd()
      .split(sep)
      .pop();
    const path = join(process.cwd(), 'packages/plugin-import/src/index.js');
    jest.doMock(path, () => 'rad');
    expect(
      await nodePackagePlugin({
        path: `../${projectDir}/packages/plugin-import/src/index.js`,
      })
    ).toBe('rad');
  });
  test('loads local module', async () => {
    const path = join(process.cwd(), 'packages/plugin-import/src/index.js');
    jest.doMock(path, () => 'dope');
    expect(
      await nodePackagePlugin({
        path: './packages/plugin-import/src/index.js',
      })
    ).toBe('dope');
  });
  test('loads absolute module', async () => {
    const path = join(process.cwd(), 'packages/plugin-import/src/index.js');
    jest.doMock(path, () => 'gnarly');
    expect(
      await nodePackagePlugin({
        path,
      })
    ).toBe('gnarly');
  });
  test('loads md file', async () => {
    const path = join(
      process.cwd(),
      'packages/meta/src/README/what-is-emdaer.md'
    );
    pathExists.mockReturnValue(Promise.resolve(true));
    getMarkdownPaths.mockReturnValue([path]);
    readFile.mockReturnValue(Promise.resolve('gnarly'));
    expect(
      await nodePackagePlugin({
        path,
      })
    ).toBe('gnarly');
    expect(readFile).toHaveBeenCalledTimes(1);
  });
  test('throws on invalid markdown path', async () => {
    const path = join(
      process.cwd(),
      'packages/meta/src/README/what-is-emdaer.md'
    );
    pathExists.mockReturnValue(Promise.resolve(false));
    getMarkdownPaths.mockReturnValue([]);
    return expect(
      nodePackagePlugin({
        path,
      })
    ).rejects.toHaveProperty(
      'message',
      expect.stringMatching(
        /Unable to import provided path: no such file or directory/
      )
    );
  });
  test('throws on invalid module path', () => {
    const path = 'notreal.js';
    return expect(
      nodePackagePlugin({
        path,
      })
    ).rejects.toHaveProperty(
      'message',
      `Unable to import provided path: Cannot find module 'notreal.js' from 'index.js'`
    );
  });
  test('executes exported function', async () => {
    const path = 'module';
    jest.doMock(path, () => () => `# fetch`);
    expect(await nodePackagePlugin({ path })).toBe('# fetch');
  });
  test('resolves promise returned by exported function', async () => {
    const path = 'module';
    jest.doMock(path, () => () => Promise.resolve(`# fetch`));
    expect(await nodePackagePlugin({ path })).toBe('# fetch');
  });
  test('catches promise rejected by exported function', () => {
    const path = 'module';
    jest.doMock(path, () => () =>
      Promise.reject(new Error('Could not do async thing'))
    );
    return expect(nodePackagePlugin({ path })).rejects.toHaveProperty(
      'message',
      'Could not do async thing'
    );
  });
  test('executes exported function with argument', async () => {
    const path = 'module';
    const args = ['next level'];
    jest.doMock(path, () => arg => `# ${arg}`);
    expect(await nodePackagePlugin({ path, args })).toBe('# next level');
  });
  test('ensures export type is correct', async () => {
    const path = 'module';
    jest.doMock(path, () => ({ wont: 'work' }));
    await expect(
      nodePackagePlugin({
        path,
      })
    ).rejects.toHaveProperty(
      'message',
      `Exported value must either be a string or a function`
    );
  });
  test('runs emdaer on content if runEmdaer is true', async () => {
    const path = 'module';
    jest.doMock(path, () => `# off the chain`);
    await nodePackagePlugin({ path, runEmdaer: true });
    expect(emdaer).toHaveBeenCalled();
  });
});
