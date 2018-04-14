jest.mock('fs-extra');
jest.mock('node-fetch');

const fs = require('fs-extra');
const contributorsDetails = require('./');
const fetch = require('node-fetch');

describe('@emdaer/plugin-contributors-details-github', () => {
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
    jest
      .spyOn(fetch, 'default')
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          json: () =>
            Promise.resolve({
              id: 202525,
              bio: 'cool bio',
              html_url: 'https://github.com/toddross',
            }),
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: 200,
          json: () =>
            Promise.resolve({
              id: 1306968,
              bio: null,
              html_url: 'https://github.com/flipactual',
            }),
        })
      );
    const details = await contributorsDetails({
      title: 'Thank you for Contributing!',
    });
    expect(details).toEqual(`<details>
<summary><strong>Thank you for Contributing!</strong></summary><br />
<a title="cool bio" href="https://github.com/toddross">
  <img align="left" src="https://avatars0.githubusercontent.com/u/202525?s=24" />
</a>
<strong>todd</strong>
<br /><br />
<a href="https://github.com/flipactual">
  <img align="left" src="https://avatars0.githubusercontent.com/u/1306968?s=24" />
</a>
<strong>flip</strong>
<br /><br />
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
        bio: 'cool bio',
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
    jest
      .spyOn(fetch, 'default')
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: 403,
          json: () => Promise.resolve({ message: 'Rate limit hit!' }),
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          status: 403,
          json: () => Promise.resolve({ message: 'Rate limit hit!' }),
        })
      );
    const details = await contributorsDetails();
    expect(details).toEqual(`<details>
<summary><strong>Contributors</strong></summary><br />
<a title="cool bio" href="https://github.com/toddross">
  <img align="left" src="https://avatars0.githubusercontent.com/u/202525?s=24" />
</a>
<strong>todd</strong>
<br /><br />
<a href="https://github.com/flipactual">
  <img align="left" src="https://avatars0.githubusercontent.com/u/1306968?s=24" />
</a>
<strong>flip</strong>
<br /><br />
</details>`);
  });
  test('throws if user does not exist in GitHub', async () => {
    fs.readFile.mockImplementation(async () => `nope <not___real___lol>`);
    fs.readJson.mockImplementation(async () => '');
    jest.spyOn(fetch, 'default').mockImplementationOnce(() =>
      Promise.resolve({
        status: 404,
        json: () => Promise.resolve({ message: 'Not Found' }),
      })
    );
    return expect(contributorsDetails()).rejects.toHaveProperty(
      'message',
      'Missing contributor info: User not___real___lol is not found in GitHub.'
    );
  });
});
