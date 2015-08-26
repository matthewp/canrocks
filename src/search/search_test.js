var QUnit = require('steal-qunit');
var ViewModel = require('./search.component!').ViewModel;
var F = require("funcunit");
var stache = require("can/view/stache/");
var $ = require("jquery");
require("canrocks/models/fixtures/");

F.attach(QUnit);

// ViewModel unit tests
QUnit.module("search-results", {
  setup: function(){
    var template = "<search-results search-term='{query}'></search-results>";
    this.renderer = stache(template);

    this.append = function(frag){
      $("#qunit-test-area").html(frag);
    };
  }
});

QUnit.test("Shows the search results info", function(){
  var frag = this.renderer({query:"all"});
  this.append(frag);

  F("search-results").exists();
  F(".search-info").text(/results for: all/, "it worked");
});

QUnit.test("Shows a no results message", function(){
  var frag = this.renderer({query:"react"});
  this.append(frag);

  F("search-results").exists("component added to the page");
  F(".no-results").exists("The empty results message shown");
});
