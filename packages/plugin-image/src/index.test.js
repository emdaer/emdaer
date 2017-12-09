const image = require('./');

describe('@emdaer/plugin-image', () => {
  test('generates image with just src', async () => {
    expect(await image({ src: '/cool-pix/happy-cat.jpg' })).toBe(
      '<p><img src="/cool-pix/happy-cat.jpg" /></p>'
    );
  });
  test('generates image with everything', async () => {
    expect(
      await image({
        src: '/cool-pix/happier-cat.jpg',
        alt: 'A very happy cat! 😸',
        align: 'center',
        width: '80px',
        height: '80px',
      })
    ).toBe(
      '<p align="center"><img src="/cool-pix/happier-cat.jpg" alt="A very happy cat! 😸" width="80px" height="80px" /></p>'
    );
  });
});
