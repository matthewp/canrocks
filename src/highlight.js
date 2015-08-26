// This module is just so that we can have 1 place where the highlighting
// theme is defined.
require("highlight.js/styles/zenburn.css!");
var can = require("can");
var hljs = require("highlight.js");
var isNode = typeof process !== "undefined" && {}.toString.call(process) === "[object process]";

exports.highlightChildren = isNode ? can.k : function(element){
  element.find('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
};
