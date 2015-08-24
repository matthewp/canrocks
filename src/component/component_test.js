import QUnit from 'steal-qunit';
import { ViewModel } from './component';

// ViewModel unit tests
QUnit.module('component');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the component-page component');
});
