var QUnit = require('steal-qunit');
var ViewModel = require('./search.component!').ViewModel;
var F = require("funcunit");
var stache = require("can/view/stache/");
var $ = require("jquery");
require("canrocks/models/fixtures/");
var AppMap = require("can-ssr/app-map");

F.attach(QUnit);

// ViewModel unit tests
QUnit.module("search-results", {
  setup: function(){
    var template = "<search-results search-term='{query}'></search-results>";
    this.renderer = stache(template);

    this.append = function(frag){
      $("#qunit-test-area").html(frag);
    };
  },
  teardown: function(){
    $("#qunit-test-area").empty();
  }
});

QUnit.test("Shows the search results info", function(){
  var frag = this.renderer(new AppMap({query:"all"}));
  this.append(frag);

  F("search-results").exists();
  F(".search-info").text(/results for: all/, "it worked");
});

QUnit.test("Shows a no results message", function(){
  var frag = this.renderer(new AppMap({query:"react"}));
  this.append(frag);

  F("search-results").exists("component added to the page");
  F(".no-results").exists("The empty results message shown");
});

QUnit.test("Doesn't show the no results message if there are results", function(){
  var frag = this.renderer(new AppMap({query:"all"}));
  this.append(frag);

  F("search-results").exists("component has been added to the page");
  F(".no-results").missing("there is no no-results message");
  F("li.component").size(4, "There are 4 components listed");
});
