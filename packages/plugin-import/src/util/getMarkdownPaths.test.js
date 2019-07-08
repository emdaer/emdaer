const getMarkdownPaths = require('./getMarkdownPaths');

describe('@emdaer/plugin-import', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  it('returns array of paths', () => {
    jest.mock('process', () => ({ cwd: () => [] }));
    require.main.paths = ['/Users/test/code/emdaer/node_modules'];
    jest.spyOn(process, 'cwd').mockReturnValue('/Users/test/code/emdaer');
    expect(getMarkdownPaths('path')).toEqual([
      '/Users/test/code/emdaer/path',
      '/Users/test/code/emdaer/node_modules/path',
    ]);
  });
});
