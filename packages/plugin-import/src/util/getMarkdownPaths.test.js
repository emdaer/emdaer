const getMarkdownPaths = require('./getMarkdownPaths');

describe('@emdaer/plugin-import', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  it('returns array of paths', () => {
    jest.spyOn(process, 'cwd').mockReturnValue('/Users/test/code/emdaer');
    expect(getMarkdownPaths('path')).toContain('/Users/test/code/emdaer/path');
  });
});
