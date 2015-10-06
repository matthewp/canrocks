var QUnit = require("steal-qunit");
var ViewModel = require("./usage-tips.component!").ViewModel;
var $ = require("jquery");
var F = require("funcunit");
var stache = require("can/view/stache/");
require("can/route/");

F.attach(QUnit);

// ViewModel unit tests
QUnit.module("<usage-tips>", {
  setup: function(){
    var renderer = stache("<usage-tips tip-number='0'></usage-tips>");
    $("#qunit-test-area").html(renderer());
  }
});

QUnit.test("Uses the tip number passed in from attributes", function(){
  F("usage-tips").text(/Limit a search/, "The type search tip was shown first");
});

