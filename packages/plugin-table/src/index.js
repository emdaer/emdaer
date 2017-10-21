/* @flow */

/**
 * A plugin to generate tables
 *
 * @param                          options
 * @param   {Array<string>}        [options.headers] The headers of the table
 * @param   {Array<Array<string>>} [options.rows]    The rows of the table
 * @returns {Promise<string>}                        The table element
 */
async function tablePlugin({
  headers,
  rows,
}: {
  headers?: Array<string>,
  rows?: Array<Array<string>>,
}): Promise<?string> {
  return `<table>${headers
    ? `<tr>${headers.reduce(
        (row, header) => `${row}<th>${header}</th>`,
        ''
      )}</tr>`
    : ''}${rows
    ? rows.reduce(
        (rowAcc, row) =>
          `${rowAcc}<tr>${row.reduce(
            (cellAcc, cell) => `${cellAcc}<td>${cell}</td>`,
            ''
          )}</tr>`,
        ''
      )
    : ''}</table>`;
}

module.exports = tablePlugin;
