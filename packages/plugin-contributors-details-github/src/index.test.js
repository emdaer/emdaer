jest.mock('fs-extra');

const fs = require('fs-extra');
const nock = require('nock'); // eslint-disable-line import/no-extraneous-dependencies
const contributorsDetails = require('./');

describe('@emdaer/plugin-contributors-details-github', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test('AUTHOR file must exist', async () =>
    expect(
      contributorsDetails({ path: './NON-EXISTENT' })
    ).rejects.toHaveProperty('message', './NON-EXISTENT does not exist'));
  test('AUTHOR file must contain at least one contributor', async () => {
    fs.readFile.mockImplementation(async () => '');
    return expect(contributorsDetails()).rejects.toHaveProperty(
      'message',
      'Your contributors file (./AUTHORS) must contain contributors in the format: "Name <username>"'
    );
  });
  test('AUTHOR file must contain correctly formatted contributors', async () => {
    fs.readFile.mockImplementation(
      async () => `todd <toddross>
      flip`
    );
    return expect(contributorsDetails()).rejects.toHaveProperty(
      'message',
      'Missing contributor info: Contributor login for flip is not valid: Expected "Name <username>"'
    );
  });
  test('generates contributor details from AUTHOR file', async () => {
    fs.readFile.mockImplementation(
      async () => `todd <toddross>
flip <flipactual>`
    );
    fs.outputJson.mockImplementation(async () => {});
    nock('https://api.github.com:443', {
      encodedQueryParams: true,
    })
      .get('/users/toddross')
      .reply(200, { id: 202525 })
      .get('/users/flipactual')
      .reply(200, { id: 1306968 });
    const details = await contributorsDetails({
      title: 'Thank you For Contributing!',
    });
    expect(details).toEqual(`<details>
<summary><strong>Thank you For Contributing!</strong></summary><br />
<img align="left" src="https://avatars0.githubusercontent.com/u/202525?s=24">
  <strong>todd</strong>
</img></br></br>
<img align="left" src="https://avatars0.githubusercontent.com/u/1306968?s=24">
  <strong>flip</strong>
</img></br></br>
</details>`);
  });
  test('handles GitHub errors', async () => {
    fs.readFile.mockImplementation(
      async () => `todd <toddross>
flip <flipactual>`
    );
    fs.readJson.mockImplementation(async () => [
      {
        id: 202525,
        name: 'todd',
        avatar_url: 'https://avatars0.githubusercontent.com/u/202525?s=24',
        html_url: 'https://github.com/toddross',
      },
      {
        id: 1306968,
        name: 'flip',
        avatar_url: 'https://avatars0.githubusercontent.com/u/1306968?s=24',
        html_url: 'https://github.com/flipactual',
      },
    ]);
    fs.outputJson.mockImplementation(async () => {});
    nock('https://api.github.com:443', {
      encodedQueryParams: true,
    })
      .get('/search/users')
      .query({ q: 'toddross in:login' })
      .reply(500, { ok: false })
      .get('/search/users')
      .query({ q: 'flipactual in:login' })
      .reply(500, { ok: false });
    const details = await contributorsDetails();
    expect(details).toEqual(`<details>
<summary><strong>Contributors</strong></summary><br />
<img align="left" src="https://avatars0.githubusercontent.com/u/202525?s=24">
  <strong>todd</strong>
</img></br></br>
<img align="left" src="https://avatars0.githubusercontent.com/u/1306968?s=24">
  <strong>flip</strong>
</img></br></br>
</details>`);
  });
  test('throws if user does not exist in GitHub', async () => {
    fs.readFile.mockImplementation(async () => `nope <not___real___lol>`);
    fs.readJson.mockImplementation(async () => '');
    nock('https://api.github.com:443', {
      encodedQueryParams: true,
    })
      .get('/users/not___real___lol')
      .reply(404, {
        message: 'Not Found',
      });
    return expect(contributorsDetails()).rejects.toHaveProperty(
      'message',
      'Missing contributor info: User not___real___lol is not found in GitHub.'
    );
  });
});
