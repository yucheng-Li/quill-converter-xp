const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const dom = new JSDOM('<div id="editor"></div>');

dom.window.document.getSelection = function () { return { getRangeAt: function () { } }; };
dom.window.document.execCommand = function (command, showUI, value) { try { return document.execCommand(command, showUI, value); } catch (e) { } return false; };

global.window = dom.window;
global.document = dom.window.document;
global.Node = dom.window.Node;
global.navigator = global.window.navigator;
global.Text = dom.window.Text;
global.HTMLElement = window.HTMLElement;
require('./polyfill')
global.MutationObserver = window.MutationObserver

const Quill = require('quill');
const quill = new Quill('#editor');


exports.convertHtmlToDelta = (html) => {

  if (!quill) {
    quill = new DOM.window.Quill('#editor');
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
  let delta = quill.clipboard.convert(html);

  return delta;
};

