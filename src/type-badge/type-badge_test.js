import QUnit from 'steal-qunit';
import { ViewModel } from './type-badge';

// ViewModel unit tests
QUnit.module('type-badge');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the type-badge component');
});
