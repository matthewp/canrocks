var QUnit = require('steal-qunit');
var ViewModel = require('./list.component!').ViewModel;

// ViewModel unit tests
QUnit.module('list');

QUnit.skip('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the component-list component');
});
