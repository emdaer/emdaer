const getMarkdownPaths = require('./getMarkdownPaths');

describe('@emdaer/plugin-import', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  it('returns array of paths', () => {
    require.main = { paths: ['/Users/test/code/emdaer/node_modules'] };
    jest.spyOn(process, 'cwd').mockReturnValue('/Users/test/code/emdaer');
    expect(getMarkdownPaths('path')).toEqual([
      '/Users/test/code/emdaer/path',
      '/home/flip/Development/emdaer/packages/plugin-import/src/util/node_modules/path',
      '/home/flip/Development/emdaer/packages/plugin-import/src/node_modules/path',
      '/home/flip/Development/emdaer/packages/plugin-import/node_modules/path',
      '/home/flip/Development/emdaer/packages/node_modules/path',
      '/home/flip/Development/emdaer/node_modules/path',
      '/home/flip/Development/node_modules/path',
      '/home/flip/node_modules/path',
      '/home/node_modules/path',
      '/node_modules/path',
    ]);
  });
});
