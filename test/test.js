const { convertHtmlToDelta } = require('../lib/index.js');

let htmlString = '<p>hello, <strong>world</strong></p>';
let delta = convertHtmlToDelta(htmlString);

console.log(JSON.stringify(delta)); // {"ops":[{"insert":"hello, "},{"insert":"world","attributes":{"bold":true}}]}