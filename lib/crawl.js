var some = require("lodash.some");
var asap = require("pdenodeify");
var getPackageReadme = asap(require("get-package-readme"));
var fetch = require("node-fetch");
var qs = require("querystring");
var getEmailAddress = asap(require("get-email-address-from-npm-username"));

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
  ]
};

var canwords = {
  "canjs": true,
  "can-component": true,
  "cancomponent": true,
  "can.view.attr": true
};

var serviceBaseUrl = "http://npmsearch.com/query?";

var fields = [
  "author",
  "created",
  "dependencies",
  "description",
  "devDependencies",
  "homepage",
  "keywords",
  "maintainers",
  "modified",
  "name",
  //"readme",
  "repository",
  "scripts",
  //"times",
  "version",
  "rating"
];

var arrFields = [
  "dependencies",
  "devDependencies",
  "keywords",
  "maintainers",

].reduce(function(acc, name){
  acc[name] = true;
  return acc;
}, {});
function shouldBeArray(field){
  return !!arrFields[field];
}

function massage(pkg){
  Object.keys(pkg).forEach(function(p){
    var val = pkg[p];
    if(Array.isArray(val) && !shouldBeArray(p)) {
      pkg[p] = val[0];
    }
  });

  pkg.time = {
    created: pkg.created,
    modified: pkg.modified
  };
  delete pkg.created;
  delete pkg.modified;
}

var loadPromise = Promise.resolve();

var hasKeywords = function(keywords){
  return some(keywords||[], function(kw){
    kw = (kw||"").toLowerCase();
    return !!canwords[kw];
  });
}

var crawlAll = exports.crawlAll = function(from){
  loadPromise.then(function(){
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

      var promises = results.map(function(pkg){
        if(hasKeywords(pkg.keywords)) {
          return crawl(pkg.name[0], true);
        }
        return Promise.resolve();
      });

      return Promise.all(promises)
        .then(function(){
          var increment = 10;
          if(from <= total) {
            return crawlAll(from + increment);
          }

          console.error("Crawl complete", from+"-"+total, new Date());
        });
    }).then(null, function(err){
      console.error("Crawl failed", err, err.stack);
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
          });
        });

        return Promise.all(getem);
      }

      if(forceSave || hasKeywords(pkg.keywords)) {
        var promises = Promise.all([
          pkg.repository ? getPackageReadme(packageName) :
            Promise.resolve(pkg.readme),
          getAllEmails(pkg)
        ]);


        return promises.then(function(results){
          pkg.readme = results[0];
          pkg.maintainers = results[1];
          pkg.type = getType(pkg.keywords);

          return new Promise(function(resolve, reject){
            db.head(pkg.name, function(err, _, headers) {
              // Probably a 404
              if(!err) {
                pkg._rev = headers["etag"].slice(1, -1);
              }

              db.insert(pkg, pkg.name, function(err){
                if(err) return reject(err);
                resolve();
              });
            });
          });
        });
      }
    });
  });
};
