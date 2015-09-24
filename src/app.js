var AppMap = require("can-ssr/app-map");
require("can/map/define/");
var loader = require("@loader");

var pages = [
  "home",
  "search",
  "components",
  "plugins",
  "attributes",
  "other",
  "how-to",
  "register"
].reduce(function(pages, page){
  pages[page] = true;
  return pages;
}, {});

var pluginPages = {
  "components": true,
  "attributes": true,
  "plugins": true,
  "other": true
};

var AppViewModel = AppMap.extend({
  define: {
    siteName: {
      value: 'canjs.rocks',
      serialize: false
    },
    title: {
      value: '',
      serialize: false
    },
    query: {
      type: "string"
    },
    page: {
      type: "string",
      set: function(val){
        // Verify this is a valid page.
        if(!pages[val]) {
          this.attr("statusCode", 404);
        }

        return val;
      }
    },
    showBanner: {
      get: function(){
        return this.attr("page") !== "home";
      }
    },
    wideMode: {
      get: function(){
        return this.attr("isPluginPage");
      }
    },
    isPluginPage: {
      get: function(){
        var page = this.attr("page");
        return !!pluginPages[page];
      }
    },
    statusCode: {
      serialize: false,
      set: function(val){
        // Don't overwrite a non-200
        if(this.statusCode && this.statusCode !== 200) {
          return this.statusCode;
        }
        return val;
      }
    }
  }
});

AppViewModel.pluginPages = pluginPages;

module.exports = AppViewModel;
