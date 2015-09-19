var State = require("../app");
var QUnit = require("steal-qunit");

QUnit.module("canrocks/app");

QUnit.test("It creates a 404 when an invalid page is set", function(){
  var state = new State({
    page: "foo-bar"
  });

  QUnit.equal(state.attr("statusCode"), 404, "Got a 404");
});

QUnit.test("components, plugins, attributes are all valid pages", function(){
  var state = new State();

  var expected = function(name){
    QUnit.equal(state.attr("statusCode"), undefined, name + " is a valid page");
  };

  [
    "components",
    "plugins",
    "attributes"
  ].forEach(function(page){
    state.attr("page", page);
    expected(page);
  });
});
