jest.mock('@emdaer/core');

const { join, sep } = require('path');
const emdaer = require('@emdaer/core');
const nodePackagePlugin = require('./');

describe('@emdaer/plugin-node-package', () => {
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
    const path = join(
      process.cwd(),
      'packages/meta/src/README/what-is-emdaer.js'
    );
    jest.doMock(path, () => 'rad');
    expect(
      await nodePackagePlugin({
        path: `../${projectDir}/packages/meta/src/README/what-is-emdaer.js`,
      })
    ).toBe('rad');
  });
  test('loads local module', async () => {
    const path = join(
      process.cwd(),
      'packages/meta/src/README/what-is-emdaer.js'
    );
    jest.doMock(path, () => 'dope');
    expect(
      await nodePackagePlugin({
        path: './packages/meta/src/README/what-is-emdaer.js',
      })
    ).toBe('dope');
  });
  test('loads absolute module', async () => {
    const path = join(
      process.cwd(),
      'packages/meta/src/README/what-is-emdaer.js'
    );
    jest.doMock(path, () => 'gnarly');
    expect(
      await nodePackagePlugin({
        path,
      })
    ).toBe('gnarly');
  });
  test('throws on invalid module path', async () => {
    const path = 'notreal.js';
    await expect(
      nodePackagePlugin({
        path,
      })
    ).rejects.toHaveProperty(
      'message',
      `Unable to require provided path: Cannot find module 'notreal.js' from 'index.js'`
    );
  });
  test('executes exported function', async () => {
    const path = 'module';
    jest.doMock(path, () => () => `# fetch`);
    expect(await nodePackagePlugin({ path })).toBe('# fetch');
  });
  test('executes exported function with argument', async () => {
    const path = 'module';
    const args = ['next level'];
    jest.doMock(path, () => arg => `# ${arg}`);
    expect(await nodePackagePlugin({ path, args })).toBe('# next level');
  });
  test('executes exported function with argument', async () => {
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
