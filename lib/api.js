var data = [{
  name: 'bit-tabs',
  owners: ["matthewp"],
  description: "A basic tabs component",
  "dist-tags": {
    "latest": "0.1.0"
  }
}];

var crawl = require("./crawl").crawl;

var cradle = require("cradle");
var connection = new(cradle.Connection)('https://canjs.cloudant.com', 443, {
  auth: {
    username: process.env.COUCHUSER,
    password: process.env.COUCHPASS
  }
});
var db = connection.database("canjs");

module.exports = function(app){
  app.get("/api/component/:name", function(req, res){
    var name = req.params.name;

    db.get(name, function(err, doc){
      if(err) {
        return res.status(500).send(err+"");
      }

      res.send(doc);
    });
  });

  app.get("/api/component", function(req, res){
    var query = req.query;

    var handleError = function(err){
      res.status(500).send(err+"");
    };

    if(query.type) {
      var params = { "include_docs": true };
      db.view("components/byType", params, function(err, docs){
        if(err) return handleError(err);
        var results = docs.map(function(i){
          return i;
        });
        res.send(results);
      });
    } else if(query.query) {
      var params = { key: query.query, "include_docs": true }
      db.view('components/byQuery', params, function (err, docs) {
        if(err) return handleError(err);
        var results = docs.map(function(i){
          return i;
        });
        res.send(results);

      });
    } else {
      res.status(404).send("Unknown query parameter")
    }
  });

  app.post("/api/component", function(req, res){
    crawl(req.body.packageName);
    res.status(200).send("ok");
  });
};
