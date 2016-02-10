var Map = require("can/map/");
var List = require("can/list/");
require("can/map/define/");
var gravatar = require("gravatarjs");

var nameExp = /^(.+)</;
var emailExp = /<(.+)>/;

var Maintainer = module.exports = Map.extend({
  define: {
    slug: {
      set: function(val){
        var name = nameExp.exec(val)[1];
        var email = emailExp.exec(val)[1];
        this.attr({
          username: name,
          email: email
        });
        return val;
      }
    },
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
    }
  }
});

Maintainer.List = can.List.extend({
  Map: Maintainer
}, {});

Maintainer.List.fromSlug = function(slug){
  var slugs = (slug instanceof List) ? slug.attr() : [slug];
  var data = slugs.map(function(slug){
    return { slug: slug };
  });
  return new Maintainer.List(data);
};
