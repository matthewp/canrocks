var AppMap = require("can-ssr/app-map");
require("can/map/define/");
var loader = require("@loader");

var pages = [
  "home",
  "search",
  "components",
  "how-to",
  "register"
].reduce(function(pages, page){
  pages[page] = true;
  return pages;
}, {});

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
        return this.attr("page") === "components";
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

module.exports = AppViewModel;
