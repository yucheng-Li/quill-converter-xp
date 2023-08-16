const fs = require('fs');
const path = require('path');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const Node = new JSDOM('').window.Node;

let quillFilePath = require.resolve('quill');
let quillMinFilePath = quillFilePath.replace('quill.js', 'quill.min.js');

let quillLibrary = fs.readFileSync(quillMinFilePath);
let mutationObserverPolyfill = fs.readFileSync(path.join(__dirname, 'polyfill.js'));

const JSDOM_TEMPLATE = `
  <div id="editor">hello</div>
  <script>${mutationObserverPolyfill}</script>
  <script>${quillLibrary}</script>
  <script>
    document.getSelection = function() {
      return {
        getRangeAt: function() { }
      };
    };
    document.execCommand = function (command, showUI, value) {
      try {
          return document.execCommand(command, showUI, value);
      } catch(e) {}
      return false;
    };
  </script>
`;

const JSDOM_OPTIONS = { runScripts: 'dangerously', resources: 'usable' };
const DOM = new JSDOM(JSDOM_TEMPLATE, JSDOM_OPTIONS);

const cache = {};


exports.convertHtmlToDelta = (html) => {
  if (!cache.quill) {
    cache.quill = new DOM.window.Quill('#editor');
    // remove all formatting except headers and bold
    cache.quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
      delta.ops = delta.ops.map(op => {
        if (
          (op.attributes && op.attributes.header) ||
          (op.attributes && op.attributes.bold)
        ) {
          return op;
        }
        return {
          insert: op.insert
        };
      });
      return delta;
    });
  }
  html = html.replace(/\n/g, '<br>');
  let delta = cache.quill.clipboard.convert(html);

  return delta;
};

