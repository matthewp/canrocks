var Map = require("can/map/");
require("can/map/define/");

module.exports = Map.extend({
  define: {
    searchTerm: {
      type: "string"
    },
    message: {
      get: function(){
        return "Searching for " + this.attr("searchTerm");
      }
    }
  }
});
