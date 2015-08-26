// This module is just so that we can have 1 place where the highlighting
// theme is defined.
require("highlight.js/styles/zenburn.css!");
var can = require("can");
var hljs = require("highlight.js/lib/highlight");
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('handlebars', require('highlight.js/lib/languages/handlebars'));
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));

var isNode = typeof process !== "undefined" && {}.toString.call(process) === "[object process]";

exports.highlightChildren = isNode ? can.k : function(element){
  element.find('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
};
