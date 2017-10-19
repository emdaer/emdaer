const link = require('./');

describe('@emdaer/plugin-link', () => {
  test('creates a link using content and link and optionally title', async () => {
    expect(
      await link({
        content: 'emdaer repo',
        link: 'https://github.com/emdaer/emdaer',
      })
    ).toBe('<a href="https://github.com/emdaer/emdaer">emdaer repo</a>');
    expect(
      await link({
        content: 'emdaer contributing',
        link: '../blob/master/CONTRIBUTING.md',
      })
    ).toBe('<a href="../blob/master/CONTRIBUTING.md">emdaer contributing</a>');
    expect(
      await link({
        content: 'emdaer repo',
        link: 'https://github.com/emdaer/emdaer',
        title: 'EMDAER Repo',
      })
    ).toBe(
      '<a href="https://github.com/emdaer/emdaer" title="EMDAER Repo">emdaer repo</a>'
    );
  });
  test('generates links with a name', async () => {
    expect(
      await link({
        content: 'Anchor',
        link: '#anchor thing',
        title: 'Link Title',
      })
    ).toBe('<a href="#anchor thing" title="Link Title">Anchor</a>');
    expect(
      await link({
        content: 'Found the Anchor',
        id: 'anchor thing',
        title: 'Linked Title',
      })
    ).toBe('<a id="anchor thing" title="Linked Title">Found the Anchor</a>');
  });
  test('generates null if given an invalid link', async () => {
    expect(
      await link({
        content: 'Anchor',
        link: 'anchor thing',
      })
    ).toBeNull();
  });
});
