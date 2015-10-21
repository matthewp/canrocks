var Map = require("can/map/");
require("can/map/define/");
var Component = require("canrocks/models/component").Component;

module.exports = Map.extend({
  define: {
    searchTerm: {
      type: "string"
    },
    message: {
      get: function(){
        return "Searching for " + this.attr("searchTerm");
      }
    },
    componentPromise: {
      get: function(){
        if(this.attr("searchTerm")) {
          var params = {
            query: this.attr("searchTerm")
          };
          var promise = Component.getList(params);
          return this.attr("%root").pageData("component", params, promise);
        }
      }
    }
  }
});
