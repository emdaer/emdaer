/* eslint-disable import/no-unresolved, import/no-extraneous-dependencies */

jest.mock('@emdaer/plugin-foo', () => async () => 'Hello, World', {
  virtual: true,
});

jest.mock(
  '@emdaer/transform-bar',
  () => async content => content.replace('Hello, World', 'Hello, World!'),
  {
    virtual: true,
  }
);

const emdaer = require('./');

describe('@emdaer/core', () => {
  it('processes an .emdaer.md file', async () => {
    expect(
      await emdaer(
        './.emdaer/README.emdaer.md',
        `# <!--emdaer-p
  - '@emdaer/plugin-foo'
  - a: 0
    b: 1
    c: 2
-->

<!--emdaer-t
  - '@emdaer/transform-bar'
-->
`
      )
    ).toMatchSnapshot();
  });
  it('can skip marked', async () => {
    expect(
      await emdaer(
        './.emdaer/README.emdaer.md',
        `# <!--emdaer-p
  - '@emdaer/plugin-foo'
  - a: 0
    b: 1
    c: 2
-->

<!--emdaer-t
  - '@emdaer/transform-bar'
-->
`,
        { marked: false }
      )
    ).toMatchSnapshot();
  });
});
