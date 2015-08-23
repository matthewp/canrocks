var can = require("can");
var superMap = require("can-connect/can/super-map/");
var tag = require("can-connect/can/tag/");
require("can/map/define/");

var Component = exports.Component = can.Map.extend({
  define: {}
});

Component.List = can.List.extend({
  Map: Component
}, {});

var componentConnection = exports.componentConnection = superMap({
  url: '/api/component',
  idProp: 'id',
  Map: Component,
  List: Component.List,
  name: 'component'
});

tag('component-model', componentConnection);
