jest.mock('fs-extra');

const fs = require('fs-extra');

const importPlugin = require('../src');

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
});
