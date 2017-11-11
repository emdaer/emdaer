jest.mock('fs-extra');

jest.mock('@emdaer/core');

const fs = require('fs-extra');
const emdaer = require('@emdaer/core');

const importPlugin = require('./');

describe('@emdaer/plugin-import', () => {
  test('imports a file', async () => {
    fs.readFile.mockImplementation(
      async () =>
        'This is the water and this is the well. Drink full and descend. The horse is the white of the eyes and dark within.'
    );
    expect(await importPlugin({ path: './tmp/.DS_Store' })).toBe(
      'This is the water and this is the well. Drink full and descend. The horse is the white of the eyes and dark within.'
    );
  });

  test('imports a file and runs emdaer on it', async () => {
    fs.readFile.mockImplementation(
      async () =>
        `This is the water and this is the well. Drink full and descend. The horse is the white of the eyes and dark within.
<!--emdaer-p
  - '@emdaer/plugin-value-from-package'
  - value: name
-->`
    );
    await importPlugin({ path: './tmp/.DS_Store', runEmdaer: true });
    expect(emdaer).toHaveBeenCalled();
  });
});
