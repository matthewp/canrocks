var npm = require("npm");
var some = require("lodash.some");
var asap = require("pdenodeify");
var getPackageReadme = require("get-package-readme");

if(!process.env.COUCHUSER || !process.env.COUCHPASS) {
  throw new Error("The environment variables COUCHUSER and COUCHPASS are required.");
}

var cradle = require("cradle");
var connection = new(cradle.Connection)('https://canjs.cloudant.com', 443, {
  auth: {
    username: process.env.COUCHUSER,
    password: process.env.COUCHPASS
  }
});

var db = connection.database("canjs");


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

var crawlAll = exports.crawlAll = function(){
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
      if(err) return;
      var pkg = info[Object.keys(info)[0]];

      if(forceSave || hasKeywords(pkg.keywords)) {
        asap(getPackageReadme)(packageName).then(function(readme){
          pkg.readme = readme;

          db.save(pkg.name, pkg, function(err){
          });
        });
      }
    });
  });
};
