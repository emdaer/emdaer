jest.mock('util', () => ({
  promisify: fn => fn,
}));
jest.mock('glob');
jest.mock('fs-extra');

const glob = require('glob');
const { readJson } = require('fs-extra');

const listLernaPackages = require('./');

function mockGlobAndReadJson() {
  glob.mockImplementation(() => [
    './packages/plugin-foo',
    './packages/plugin-bar',
  ]);
  readJson.mockImplementationOnce(() => ({
    name: 'plugin-foo',
    description: 'does a foo',
  }));
  readJson.mockImplementationOnce(() => ({
    name: 'plugin-bar',
    description: 'does a bar',
  }));
}

describe('@emdaer/plugin-list-lerna-packages', () => {
  test('returns empty string when there are no packages', async () => {
    glob.mockImplementation(() => []);
    expect(await listLernaPackages()).toBe('');
  });
  test('returns list of packages with links and descriptions', async () => {
    mockGlobAndReadJson();
    expect(await listLernaPackages())
      .toBe(`- **[plugin-foo](./packages/plugin-foo)** does a foo
- **[plugin-bar](./packages/plugin-bar)** does a bar`);
    expect(readJson).toHaveBeenCalledWith('./packages/plugin-foo/package.json');
    expect(readJson).toHaveBeenCalledWith('./packages/plugin-bar/package.json');
  });
  test('returns list of packages without descriptions', async () => {
    mockGlobAndReadJson();
    expect(await listLernaPackages({ descriptions: false }))
      .toBe(`- **[plugin-foo](./packages/plugin-foo)**
- **[plugin-bar](./packages/plugin-bar)**`);
  });
  test('returns list of packages without links', async () => {
    mockGlobAndReadJson();
    expect(await listLernaPackages({ links: false }))
      .toBe(`- **plugin-foo** does a foo
- **plugin-bar** does a bar`);
  });
  test('returns list of packages without links or descriptions', async () => {
    mockGlobAndReadJson();
    expect(await listLernaPackages({ descriptions: false, links: false }))
      .toBe(`- **plugin-foo**
- **plugin-bar**`);
  });
});
