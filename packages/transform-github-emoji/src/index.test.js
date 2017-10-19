const ghEmoji = require('./');

describe('@emdaer/transform-github-emoji', () => {
  test('transforms gh flavored text into respective image of emoji.', async () => {
    expect(await ghEmoji('"I :heart: emdaer. :heart_eyes:"')).toBe(
      '"I ❤️ emdaer. 😍"'
    );
  });
});
