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
    "can-attribute",
    "attribute"
  ],
  helper: [
    "can-helper",
    "helper"
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
    kw = (kw||"").toLowerCase();
    return !!canwords[kw];
  });
}

var crawlAll = exports.crawlAll = function(){
  loadPromise.then(function(){
<<<<<<< HEAD
    var query = {
      q: "canjs",
      fields: "name,keywords"
    };
    if(from) {
      query.from = from;
    }
    var url = serviceBaseUrl + qs.stringify(query);

    fetch(url).then(function(res){
      return res.json();
    }).then(function(r){
      var results = r.results;
      var total = +r.total;
      var from = +r.from;

      console.log("From", from, total);

      var promises = results.map(function(pkg){
=======
    npm.commands.search("canjs", true, function(err, results){
      for(var p in results) {
        var pkg = results[p];
>>>>>>> parent of f1d5b09... New crawling
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
<<<<<<< HEAD
  return loadPromise.then(function(){
    var query = {
      q: "name:"+packageName,
      fields: fields.join(",")
    };

    var url = serviceBaseUrl + qs.stringify(query);

    return fetch(url).then(function(res){
      return res.json();
    }).then(function(r){
      var results = r.results;
      var pkg = results.filter(function(res){
        return res.name[0] === packageName;
      })[0];
      massage(pkg);

      function getAllEmails(pkg){
        var maintainers = pkg.maintainers || [];
        var getem = maintainers.map(function(username){
          return getEmailAddress(username).then(function(email){
            return {
              username: username,
              email: email
            };
          }, function(err){
             console.log("got error", err)
          });
        });

        return Promise.all(getem);
      }
=======
  loadPromise.then(function(){
    npm.commands.view([packageName], function(err, info){
      if(err) return;
      var pkg = info[Object.keys(info)[0]];
>>>>>>> parent of f1d5b09... New crawling

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
