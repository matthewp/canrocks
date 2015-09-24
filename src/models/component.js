var can = require("can");
var superMap = require("can-connect/can/super-map/");
var tag = require("can-connect/can/tag/");
require("can/map/define/");

var Component = exports.Component = can.Map.extend({
  define: {
    version: {
      get: function(){
        return this.attr("dist-tags.latest") || this.attr("versions");
      }
    },
    owners: {
      set: function(val){
        this.attr("primaryOwner", val.attr(0));
        return val;
      }
    },
    typePlural: {
      get: function(){
        var type = this.attr("type");
        if(type) {
          return type + "s";
        }
        return "other";
      }
    }
  }
});

Component.List = can.List.extend({
  Map: Component
}, {});

var componentConnection = exports.componentConnection = superMap({
  url: '/api/component',
  idProp: 'name',
  Map: Component,
  List: Component.List,
  name: 'component'
});

tag('component-model', componentConnection);
