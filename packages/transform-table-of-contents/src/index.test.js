const tableOfContentsTransform = require('./');

describe('@emdaer/transform-table-of-contents', () => {
  test('errors if there is no <!-- toc --> comment', () =>
    expect(
      tableOfContentsTransform('## Heading without TOC comment')
    ).rejects.toHaveProperty(
      'message',
      'Content does not contain "<!-- toc -->" and therefore cannot insert a table of contents.'
    ));
  test('generates a table of contents in place of <!-- toc -->', async () =>
    expect(
      await tableOfContentsTransform(`
# cool
<!-- toc -->
## Install
## Usage
### Windows
### Mac
## FAQs       
`)
    ).toEqual(`# cool

<!-- toc -->

- [Install](#install)
- [Usage](#usage)
  * [Windows](#windows)
  * [Mac](#mac)
- [FAQs](#faqs)

<!-- tocstop -->

## Install
## Usage
### Windows
### Mac
## FAQs
`));
});
