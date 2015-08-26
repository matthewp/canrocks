var fixture = require("can-connect/fixture/");

var store = fixture.store([{
  name: 'bit-tabs',
  owners: ["matthewp"],
  description: "A basic tabs component",
  "dist-tags": {
    "latest": "0.1.0"
  }
}, {
  name: 'bit-grid',
  owners: ["matthewp"],
  description: "A set of components for grids",
  "dist-tags": {
    "latest": "0.5.0"
  }
}, {
  name: "can-lorem-ipsum",
  owners: ["matthewp"],
  description: "A can.Component for lorem ipsum text",
  "dist-tags": {
    "latest": "1.0.0"
  }
}], function(item, req){
  var query = req.data.query;
  if(query === "all") return true;
  var exp = new RegExp(query, "gi");
  return exp.test(item.name) || exp.test(item.description);
});

fixture({
  'GET /api/component': store.findAll,
  'GET /api/component/{id}': store.findOne,
  'POST /api/component': store.create,
  'PUT /api/component/{id}': store.update,
  'DELETE /api/component/{id}': store.destroy
});

module.exports = store;
