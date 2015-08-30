import QUnit from 'steal-qunit';
import { ViewModel } from './search-form';

// ViewModel unit tests
QUnit.module('search-form');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the search-form component');
});
