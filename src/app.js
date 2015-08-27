var AppMap = require("can-ssr/app-map");
require("can/map/define/");
var loader = require("@loader");

var AppViewModel = AppMap.extend({
  define: {
    siteName: {
      value: 'canjs.rocks',
      serialize: false
    },
    title: {
      value: 'canjs.rocks',
      serialize: false
    },
    query: {
      type: "string"
    },
    page: {
      type: "string"
    },
    wideMode: {
      get: function(){
        return this.attr("page") === "components";
      }
    }
  }
});

module.exports = AppViewModel;
