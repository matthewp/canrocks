var asap = require("pdenodeify");
var follow = require("follow");
var some = require("lodash.some");
var db = require("./db");
var getPackageReadme = asap(require("get-package-readme"));
var package = require("../package.json");
var Configstore = require('configstore');

var conf = new Configstore(package.name, {});

function beginFollowing(since){
  console.log("Since", since);

  return new Promise(function(resolve, reject){
    var f = follow({
      db: 'https://skimdb.npmjs.com/registry',
      since: since || 0,
      include_docs: true,
      inactivity_ms: 1000 * 60 * 60,
    }, function(err, change){
      if(err) {
        console.log("Following", err);
        return;
      }

      conf.set("since", change.seq);

      if(hasCanWords(change.doc)) {
        save(change.doc);
      }
    });

    f.on("catchup", function(){
      f.pause();
      resolve();
    });
  });
}

var canwords = {
  "canjs": true,
  "can-component": true,
  "cancomponent": true,
  "can.view.attr": true
};
var has = Object.prototype.hasOwnProperty;

function hasCanWords(doc) {
  var keywords = doc.keywords;
  if(!keywords) {
    var dist = doc["dist-tags"];
    if(dist && dist.latest) {
      var v = doc.versions[dist.latest];
      if(v) {
        keywords = v.keywords;
      }
    }
  }
  if(keywords) {
    return some(keywords||[], function(kw){
      kw = (kw||"").toLowerCase();
      return has.call(canwords, kw);
    });
  }
  return false;
}

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

function getType(keywords){
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

function save(pkg){
  delete pkg._rev;

  console.log("Saving", pkg.name);

  return getPackageReadme(pkg.name).then(function(readme){
    pkg.readme = readme;
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

exports.crawlAll = function(){
  return beginFollowing(conf.get("since"));
};
