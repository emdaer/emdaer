/* @flow */

const fs = require('fs-extra');
const fetch = require('node-fetch').default;

type Contributor = {
  login: string,
  avatar_url: string,
  html_url: string,
  login: string,
  name: string,
  bio: string,
};

const DEFAULT_PATH = './AUTHORS';
const DEFAULT_SUMMARY_TITLE = 'Contributors';
const CONTRIBUTORS_DATA_FILE =
  './.emdaer/.offline/plugin-contributors-details-github/contributors-data.json';
const EXAMPLE_FORMAT = '"Name <username>"';

function getSummary(summary: string): string {
  return `<summary><strong>${summary}</strong></summary><br />`;
}

async function fetchUser(login: string, name: string): Promise<Contributor> {
  const response = await fetch(`https://api.github.com/users/${login}`);
  const user = await response.json();
  return Object.assign(user, {
    login,
    name,
    avatar_url: `https://avatars0.githubusercontent.com/u/${user.id}?s=24`,
  });
}

async function cacheContributorData(
  contributors: Array<Contributor>
): Promise<Array<Contributor>> {
  return fs
    .outputJson(CONTRIBUTORS_DATA_FILE, await contributors, { spaces: 2 })
    .then(() => contributors);
}

async function getContributors(
  contributors: Array<string>
): Promise<Array<Contributor>> {
  return Promise.all(
    contributors.map(contributor => {
      const [name, loginPart] = contributor.split('<').map(part => part.trim());
      if (!loginPart) {
        throw new Error(
          `Contributor login for ${name} is not valid: Expected ${EXAMPLE_FORMAT}`
        );
      }
      const login = loginPart
        .split('>')
        .shift()
        .trim();
      return fetchUser(login, name);
    })
  )
    .catch(() => fs.readJson(CONTRIBUTORS_DATA_FILE))
    .then(data => {
      const invalidContributor = data.find(contributor => !contributor.id);
      if (invalidContributor) {
        throw new Error(
          `User ${invalidContributor.login} is not found in GitHub.`
        );
      }
      return cacheContributorData(data);
    });
}

/**
 * A plugin to generate details
 *
 * @param                     options
 * @param   {string}          [options.path]    The path to the contributors list
 * @param   {string}          [options.content]           The content of the details
 * @returns {Promise<string>}                             The details element
 */
async function contributorsDetailsPlugin(
  {
    path = DEFAULT_PATH,
    title = DEFAULT_SUMMARY_TITLE,
  }: {
    path?: string,
    title?: string,
  } = {
    path: DEFAULT_PATH,
    title: DEFAULT_SUMMARY_TITLE,
  }
): Promise<?string> {
  let authorFileContents;
  try {
    authorFileContents = (await fs.readFile(path)).toString();
  } catch (e) {
    throw new Error(`${path} does not exist`);
  }
  const contributors = authorFileContents.split('\n').filter(person => person);
  if (contributors.length < 1) {
    throw new Error(
      `Your contributors file (${path}) must contain contributors in the format: ${EXAMPLE_FORMAT}`
    );
  }
  let contributorsData;
  try {
    contributorsData = await getContributors(Array.from(new Set(contributors)));
  } catch (e) {
    throw new Error(`Missing contributor info: ${e.message}`);
  }
  return `<details>
${getSummary(title)}
${contributorsData
    .map(
      contributor =>
        `<a${contributor.bio
          ? ` title="${contributor.bio}"`
          : ''} href="${contributor.html_url}">
  <img align="left" src="${contributor.avatar_url}" />
</a>
<strong>${contributor.name}</strong>
<br /><br />`
    )
    .join('\n')}
</details>`;
}

module.exports = contributorsDetailsPlugin;
