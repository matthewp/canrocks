var QUnit = require("steal-qunit");
var ViewModel = require("./search-form.component!").ViewModel;
var Map = require("can/map/");
var stache = require("can/view/stache/");
var $ = require("jquery");
var F = require("funcunit");

F.attach(QUnit);

// ViewModel unit tests
QUnit.module("<search-form>", {
  setup: function(){
    this.root = new Map();
    var tmpl = stache("<search-form></search-form>");
    $("#qunit-test-area").html(tmpl(this.root))
  }
});

QUnit.test("Updates the searchTerm property on the root viewModel", function(){
  F(".search-term").exists().type("canjs").blur();
  F(".submit-button").click();

  var root = this.root;
  F(function(){
    var term = root.attr("query");
    QUnit.equal(term, "canjs", "The query was set on the root viewModel");
  });
});
