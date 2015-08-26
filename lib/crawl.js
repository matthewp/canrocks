var npm = require("npm");
var low = require("lowdb");
var db = low(require("../package.json").canrocks.database);
var some = require("lodash.some");
var asap = require("pdenodeify");

var canwords = {
  "can-component": true,
  "cancomponent": true
};

var loadPromise = new Promise(function(resolve, reject){
  npm.load(function(err){
    if(err) return reject(err);
    resolve();
  });
});

var hasKeywords = function(keywords){
  return some(keywords, function(kw){
    return !!canwords[kw];
  });
}

var crawlAll = function(){
  loadPromise.then(function(){
    npm.commands.search("can-component", true, function(err, results){
      for(var p in results) {
        var pkg = results[p];
        if(hasKeywords(pkg.keywords)) {
          crawl(pkg.name, true);
        }
      }
    });
  });
}

var crawl = exports.crawl = function(packageName, forceSave){
  loadPromise.then(function(){
    npm.commands.view([packageName], function(err, info){
      var pkg = info[Object.keys(info)[0]];

      if(forceSave || hasKeywords(pkg.keywords)) {
        db("components").push(pkg);
      }
    });
  });
};
