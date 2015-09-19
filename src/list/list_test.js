var QUnit = require('steal-qunit');
var ViewModel = require('./list.component!').ViewModel;
var F = require("funcunit");
var $ = require("jquery");
var can = require("can");
var stache = require("can/view/stache/");
var Component = require("canrocks/models/component").Component;

F.attach(QUnit);

// ViewModel unit tests
QUnit.module('list');

QUnit.skip('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the component-list component');
});

// Component tests
QUnit.module("<component-list>", {
  setup: function(){
    this.dfd = new can.Deferred();
    this.state = new can.Map({
      promise: this.dfd.promise()
    });
    var template = stache("<component-list promise='{promise}'></component-list>");
    $("#qunit-test-area").html(template(this.state));
  },
  teardown: function(){
    $("#qunit-test-area").empty();
  }
});

QUnit.test("It has the correct link according to the type of plugin", function(){
  var components = new Component.List([
    {type: "plugin"}
  ]);

  this.dfd.resolve(components);

  F(".component-name").attr("href", /page=plugins/, "Correct link for the type of plugin");
});
