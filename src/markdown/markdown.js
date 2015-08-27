var Component = require("can/component/");
var Map = require("can/map/");
require("can/map/define/");
var template = require("./markdown.stache!");
var marked = require("marked");
var can = require("can");

exports.ViewModel = Map.extend({
  define: {
    data: {
      value: null
    }
  }
});

exports.Component = Component.extend({
  tag: 'markdown-content',
  viewModel: exports.ViewModel,
  template: template,
  helpers: {
    "2html": function(markdown){
      markdown = markdown.isComputed ? markdown() : markdown;
      var html = marked(markdown);
      var frag = can.frag(html);
      return frag;
    }
  }
});
