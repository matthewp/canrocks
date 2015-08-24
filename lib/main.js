var npm = require("npm");
var low = require("lowdb");
var db = low(require("../package.json").canrocks.database);
var some = require("lodash.some");

var canwords = {
  "can-component": true,
  "cancomponent": true
};

npm.load(function(){
  npm.commands.search("can-component", true, function(err, results){
    for(var p in results) {
      var pkg = results[p];
      if(some(pkg.keywords, function(kw){
        return !!canwords[kw];
      })) {
        npm.commands.view([pkg.name], function(err, info){
          var pkg = info[Object.keys(info)[0]];
          db("components").push(pkg);
        });
      }
    }
  });
});

