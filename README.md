# quill-converter-xp
> Convert HTML to a Quill Delta or a Quill Delta to HTML

The purpose of this package is to assist in migrating to or from the [Quill editor](https://quilljs.com/).

## Installation
```
# Via NPM
npm install quill-converter-xp --save

# Via Yarn
yarn add quill-converter-xp
```

## Getting Started

### Convert a HTML string to a Quill delta:
```js
const { convertHtmlToDelta } = require('quill-converter-xp');

let htmlString = '<p>hello, <strong>world</strong></p>';
let delta = convertHtmlToDelta(htmlString);

console.log(JSON.stringify(delta)); // {"ops":[{"insert":"hello, "},{"insert":"world","attributes":{"bold":true}}]}
```
