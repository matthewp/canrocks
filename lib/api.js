var data = [{
  name: 'bit-tabs',
  owners: ["matthewp"],
  description: "A basic tabs component",
  "dist-tags": {
    "latest": "0.1.0"
  }
}];

var low = require("lowdb");
var db = low(require("../package.json").canrocks.database);
var crawl = require("./crawl").crawl;

module.exports = function(app){
  app.get("/api/component/:name", function(req, res){
    var name = req.params.name;
    var result = db("components").find({name: name});
    if(result) {
      res.send(result);
    } else {
      res.status(404).send("Not found");
    }
  });

  app.get("/api/component", function(req, res){
    var components = db("components");
    var query = req.query;

    if(query.type) {
      res.send(special(components, query.type));
    } else if(query.query) {
      res.send(search(components, query.query));
    } else {
      res.status(404).send("Unknown query parameter")
    }
  });

  app.post("/api/component", function(req, res){
    crawl(req.body.packageName);
    res.status(200).send("ok");
  });
};


function search(components, query){
  var exp = new RegExp(query, "gi");
  return components.filter(function(pkg){
    return exp.test(pkg.name) || exp.test(pkg.description);
  });
}

function special(components, type){
  return components;
}
