/* @flow */

const fs = require('fs-extra');
const fetch = require('node-fetch').default;

type Contributor = {
  login: string,
  avatar_url: string,
  html_url: string,
  email: string,
  name: string,
};

const CONTRIBUTORS_DATA_FILE = './.emdaer/contributors-data.json';
const EXAMPLE_FORMAT = '"Name <email@email.com>"';
const isEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function getSummary(summary: string): string {
  return summary ? `<summary><strong>${summary}</strong></summary><br />` : '';
}

function getFormatError(name: string): string {
  return `Contributor email for ${name} is not valid: Expected ${EXAMPLE_FORMAT}`;
}

async function fetchUser(email: string, name: string): Promise<Contributor> {
  const GH_FETCH_ERROR = `Unable to fetch ${email} from the Github API.`;
  const response = await fetch(
    `https://api.github.com/search/users?q=${email}+in:email`
  );
  if (!response.ok) {
    throw new Error(GH_FETCH_ERROR);
  }
  const user = (await response.json()).items[0];
  return Object.assign(user, {
    email,
    name,
    avatar_url: `https://avatars0.githubusercontent.com/u/${user.id}?s=24`,
  });
}

async function cacheContributorData(
  contributors: Array<Contributor>
): Promise<Array<Contributor>> {
  return fs
    .outputJson(CONTRIBUTORS_DATA_FILE, await contributors)
    .then(() => contributors);
}

async function getContributors(
  contributors: Array<string>
): Promise<Array<Contributor>> {
  return Promise.all(
    contributors.map(contributor => {
      const [name, emailPart] = contributor.split('<').map(part => part.trim());
      if (!emailPart) {
        throw new Error(getFormatError(name));
      }
      const email = emailPart
        .split('>')
        .shift()
        .trim();
      if (!isEmail.test(email)) {
        throw new Error(getFormatError(name));
      }
      return fetchUser(email, name);
    })
  )
    .then(cacheContributorData)
    .catch(() => fs.readJson(CONTRIBUTORS_DATA_FILE));
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
    path = './AUTHORS',
    title = 'Contributors',
  }: {
    path?: string,
    title?: string,
  } = {
    path: './AUTHORS',
    title: 'Contributors',
  }
): Promise<?string> {
  const contributors = (await fs.readFile(path))
    .toString()
    .split('\n')
    .filter(person => person);
  if (contributors.length < 1) {
    throw new Error(
      `Your contributors file (${path}) must contain contributors in the format: ${EXAMPLE_FORMAT}`
    );
  }
  const contributorsData = await getContributors(contributors);

  return `<details>
${getSummary(title)}
${contributorsData
    .map(
      contributor =>
        `<img align="left" src="${contributor.avatar_url}">
  <strong>${contributor.name}</strong>
</img></br></br>`
    )
    .join('\n')}
</details>`;
}

module.exports = contributorsDetailsPlugin;
