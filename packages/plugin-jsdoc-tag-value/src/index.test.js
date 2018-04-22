const jsdocTagValue = require('./');

describe('@emdaer/plugin-jsdoc-tag-value', () => {
  test('gets jsdoc example tag', async () =>
    expect(
      jsdocTagValue({
        source: './packages/plugin-jsdoc-tag-value/src/index.js',
        functionName: 'jsdocTagValue',
        tag: 'example',
      })
    ).resolves.toEqual(
      `<!--emdaer-p
  - '@emdaer/plugin-jsdoc-tag-value'
  - source: ./src/index.js
    functionName: jsdocTagValue
    tag: example
    tagIndex: 0
-->
<!--emdaer-p
  - '@emdaer/plugin-jsdoc-tag-value'
  - source: ./src/index.js
    functionName: jsdocTagValue
    tag: example
-->`
    ));
  test('gets jsdoc example tag at a given tagIndex', async () =>
    expect(
      jsdocTagValue({
        source: './packages/plugin-jsdoc-tag-value/src/index.js',
        functionName: 'jsdocTagValue',
        tag: 'example',
        tagIndex: 1,
      })
    ).resolves.toEqual(
      `<!--emdaer-p
  - '@emdaer/plugin-jsdoc-tag-value'
  - source: ./src/index.js
    functionName: jsdocTagValue
    tag: example
-->`
    ));
  test('throws on unfound functionName', () =>
    expect(
      jsdocTagValue({
        source: './packages/plugin-jsdoc-tag-value/src/index.js',
        functionName: 'notReal',
        tag: 'example',
      })
    ).rejects.toHaveProperty(
      'message',
      'notReal jsdoc from ./packages/plugin-jsdoc-tag-value/src/index.js does not exist'
    ));
  test('throws on invalid tag', () =>
    expect(
      jsdocTagValue({
        source: './packages/plugin-jsdoc-tag-value/src/index.js',
        functionName: 'jsdocTagValue',
        tag: 'notatag',
      })
    ).rejects.toHaveProperty(
      'message',
      'notatag not found in jsdocTagValue jsdoc from ./packages/plugin-jsdoc-tag-value/src/index.js'
    ));
  test('throws on invalid tagIndex', () =>
    expect(
      jsdocTagValue({
        source: './packages/plugin-jsdoc-tag-value/src/index.js',
        functionName: 'jsdocTagValue',
        tag: 'example',
        tagIndex: 40,
      })
    ).rejects.toHaveProperty(
      'message',
      'jsdocTagValue of ./packages/plugin-jsdoc-tag-value/src/index.js has no example tag at index 40'
    ));
  test('throws on not found source', () =>
    expect(
      jsdocTagValue({
        source: './packages/plugin-jsdoc-tag-value/src/notAFile.js',
        functionName: 'jsdocTagValue',
        tag: 'example',
      })
    ).rejects.toHaveProperty(
      'message',
      'jsdocTagValue jsdoc from ./packages/plugin-jsdoc-tag-value/src/notAFile.js does not exist'
    ));
  test('throws when missing source option', () =>
    expect(
      jsdocTagValue({
        functionName: 'jsdocTagValue',
        tag: 'example',
      })
    ).rejects.toHaveProperty(
      'message',
      'source option expected by plugin-jsdoc-value plugin'
    ));
  test('throws when missing functionName option', () =>
    expect(
      jsdocTagValue({
        source: './packages/plugin-jsdoc-tag-value/src/notAFile.js',
        tag: 'example',
      })
    ).rejects.toHaveProperty(
      'message',
      'functionName option expected by plugin-jsdoc-value plugin'
    ));
  test('throws when missing tag option', () =>
    expect(
      jsdocTagValue({
        source: './packages/plugin-jsdoc-tag-value/src/notAFile.js',
        functionName: 'jsdocTagValue',
      })
    ).rejects.toHaveProperty(
      'message',
      'tag option expected by plugin-jsdoc-value plugin'
    ));
});
