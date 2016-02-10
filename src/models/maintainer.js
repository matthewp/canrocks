var Map = require("can/map/");
var List = require("can/list/");
require("can/map/define/");
var gravatar = require("gravatarjs");

var nameExp = /^(.+)</;
var emailExp = /<(.+)>/;

var Maintainer = module.exports = Map.extend({
  define: {
    gravatarUrl: {
      get: function(){
        var email = this.attr("email");
        return email ? gravatar(email) : undefined;
      }
    },
    npmPage: {
      get: function(){
        var name = this.attr("username");
        return name ? ("https://www.npmjs.com/~" + name) : undefined;
      }
    },
    username: {
      get: function(){
        return this.attr("name");
      }
    }
  }
});

Maintainer.List = can.List.extend({
  Map: Maintainer
}, {});
