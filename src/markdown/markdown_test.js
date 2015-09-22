var QUnit = require("steal-qunit");
var ViewModel = require("./markdown").ViewModel;
var stache = require("can/view/stache/");

QUnit.module("<markdown-content>");

QUnit.test("can handle no markdown content", function(){
  var template = stache("<markdown-content data='{md}'></markdown-content>");
  ok(template(), "the template did not throw with undefined markdown");
});
