var test = require("tape");
var createQuery = require("./search_query");

test("basic query", function(t){
  t.plan(1);
  var query = createQuery("canjs stuff");
  t.equal(query, "canjs stuff");
});

test("type in the back", function(t){
  t.plan(1);
  var query = createQuery("tabs +plugin");
  t.equal(query, "tabs AND type:plugin");
});

test("type in the front", function(t){
  t.plan(1);
  var query = createQuery("+component tabs and stuff");
  t.equal(query, "tabs and stuff AND type:component");
});

test("type in the middle", function(t){
  t.plan(1);
  var query = createQuery("something +attribute else");
  t.equal(query, "something else AND type:attribute");
});

test("only searching for a type", function(t){
  t.plan(1);
  var query = createQuery("+component");
  t.equal(query, "type:component");
});
