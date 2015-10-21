var QUnit = require('steal-qunit');
var ViewModel = require('./how-to.component').ViewModel;

// ViewModel unit tests
QUnit.module('how-to');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the how-to component');
});
