/* @flow */

function getSummary(summary) {
  return summary ? `<summary><strong>${summary}</strong></summary><br />` : '';
}

/**
 * Renders a HTML5 details element as a disclosure widget.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details}
 * @example
 * <!--emdaer-p
 *   - '@emdaer/plugin-details'
 *   - summary: Details summary
 *     content: Here's the content!
 * -->
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
