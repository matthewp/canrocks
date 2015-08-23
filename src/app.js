var AppMap = require("can-ssr/app-map");
require("can/map/define/");

var AppViewModel = AppMap.extend({
  define: {
    message: {
      value: 'CanJS Components Rocks!',
      serialize: false
    },
    title: {
      value: 'can.Components',
      serialize: false
    }
  }
});

module.exports = AppViewModel;
