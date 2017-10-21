/* @flow */

function getSummary(summary) {
  return summary ? `<summary><strong>${summary}</strong></summary><br />` : '';
}

/**
 * A plugin to generate details
 *
 * @param                     options
 * @param   {string}          [options.summary]           The summary of the details
 * @param   {string}          [options.content]           The content of the details
 * @returns {Promise<string>}                             The details element
 */
async function detailsPlugin({
  summary,
  content,
}: {
  summary?: string,
  content: string,
}): Promise<?string> {
  return `<details>
${getSummary(summary)}
${content}
</details>`;
}

module.exports = detailsPlugin;
