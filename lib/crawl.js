var npm = require("npm");
var some = require("lodash.some");
var asap = require("pdenodeify");
var getPackageReadme = require("get-package-readme");

if(!process.env.COUCHUSER || !process.env.COUCHPASS) {
  throw new Error("The environment variables COUCHUSER and COUCHPASS are required.");
}

var db = require("./db");

var types = {
  component: [
    "can-component",
    "cancomponent"
  ],
  plugin: [
    "can-plugin",
    "plugin"
  ],
  attribute: [
    "can.view.attr",
    "can-attribute"
  ]
};

var canwords = {
  "canjs": true,
  "can-component": true,
  "cancomponent": true,
  "can.view.attr": true
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
    npm.commands.search("canjs", true, function(err, results){
      for(var p in results) {
        var pkg = results[p];
        if(hasKeywords(pkg.keywords)) {
          crawl(pkg.name, true);
        }
      }
    });
  });
}

var getType = function(keywords){
  var pkgType;
  keywords.forEach(function(kw){
    var typeKeywords;
    for(var type in types) {
      typeKeywords = types[type];
      if(!!~typeKeywords.indexOf(kw)) {
        pkgType = type;
        return false;
      }
    }
  });
  return pkgType;
}

var crawl = exports.crawl = function(packageName, forceSave){
  loadPromise.then(function(){
    npm.commands.view([packageName], function(err, info){
      if(err) return;
      var pkg = info[Object.keys(info)[0]];

      if(forceSave || hasKeywords(pkg.keywords)) {
        asap(getPackageReadme)(packageName).then(function(readme){
          pkg.readme = readme;
          pkg.type = getType(pkg.keywords);

          db.head(pkg.name, function(err, _, headers) {
            if(err) return;

            pkg._rev = headers["etag"].slice(1, -1);
            db.insert(pkg, pkg.name, function(err){});
          });
        });
      }
    });
  });
};
