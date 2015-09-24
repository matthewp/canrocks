var QUnit = require('steal-qunit');
var Component = require('./component').Component;

QUnit.module('models/component');

QUnit.test('getList', function(){
  stop();
  Component.getList().then(function(items) {
    QUnit.equal(items.length, 5);
    QUnit.equal(items.attr('0.description'), 'A basic tabs component');
    start();
  });
});
