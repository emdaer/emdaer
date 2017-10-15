const table = require('../src');

describe('@emdaer/plugin-table', () => {
  test('generates tables with headers', async () => {
    expect(await table({ headers: ['A', 'B', 'C'] })).toBe(
      '<table><tr><th>A</th><th>B</th><th>C</th></tr></table>'
    );
  });
  test('generates tables with rows', async () => {
    expect(await table({ rows: [[1, 2, 3], [2, 3, 4], [3, 4, 5]] })).toBe(
      '<table><tr><td>1</td><td>2</td><td>3</td></tr><tr><td>2</td><td>3</td><td>4</td></tr><tr><td>3</td><td>4</td><td>5</td></tr></table>'
    );
  });
  test('generates tables with headers and rows', async () => {
    expect(
      await table({
        headers: ['A', 'B', 'C'],
        rows: [[1, 2, 3], [2, 3, 4], [3, 4, 5]],
      })
    ).toBe(
      '<table><tr><th>A</th><th>B</th><th>C</th></tr><tr><td>1</td><td>2</td><td>3</td></tr><tr><td>2</td><td>3</td><td>4</td></tr><tr><td>3</td><td>4</td><td>5</td></tr></table>'
    );
  });
  test('generates tables without headers or rows', async () => {
    expect(await table({})).toBe('<table></table>');
  });
});
