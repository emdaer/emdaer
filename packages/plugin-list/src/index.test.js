const list = require('./');

describe('@emdaer/plugin-list', () => {
  test('generates ordered lists', async () => {
    expect(await list({ type: 'ol', items: ['item1', 'item2'] })).toBe(
      '<ol>\n<li>item1</li>\n<li>item2</li>\n</ol>'
    );
  });
  test('generates unordered lists', async () => {
    expect(await list({ type: 'ul', items: ['item1', 'item2'] })).toBe(
      '<ul>\n<li>item1</li>\n<li>item2</li>\n</ul>'
    );
  });
  test('generates nestedlists', async () => {
    expect(
      await list({
        type: 'ul',
        items: [
          'item1',
          {
            plugin: 'list',
            options: { type: 'ol', items: ['nested', 'list'] },
          },
          'item3',
        ],
      })
    ).toBe(
      '<ul>\n<li>item1</li>\n<li><ol>\n<li>nested</li>\n<li>list</li>\n</ol></li>\n<li>item3</li>\n</ul>'
    );
  });
});
