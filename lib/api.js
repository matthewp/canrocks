var data = [{
  name: 'bit-tabs',
  owners: ["matthewp"],
  description: "A basic tabs component",
  "dist-tags": {
    "latest": "0.1.0"
  }
}];

var crawl = require("./crawl").crawl;
var db = require("./db");

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

    var viewName;
    var params = { "include_docs": true };

    var handleResponse = function(err, body){
      if(err) return handleError(err);
      var results = body.rows.map(function(i){
        return i.doc;
      });
      res.send(results);
    };

    if(query.type) {
      viewName = "byType";
      if(query.type === "recent") {
        viewName = "byDate";
        params.descending = true;
      }
    } else if(query.query) {
      params.q = query.query.toLowerCase();

      db.search("components", "pluginSearch", params, handleResponse);
      return;
    } else {
      res.status(404).send("Unknown query parameter")
      return;
    }

    // Maybe limit the results
    if(query.limit) {
      params.limit = query.limit;
    }

    db.view("components", viewName, params, handleResponse);
  });

  app.post("/api/component", function(req, res){
    crawl(req.body.packageName);
    res.status(200).send("ok");
  });
};
