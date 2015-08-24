import QUnit from 'steal-qunit';
import { ViewModel } from './list.component!';

// ViewModel unit tests
QUnit.module('list');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the component-list component');
});
