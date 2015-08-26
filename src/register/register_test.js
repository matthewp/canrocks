import QUnit from 'steal-qunit';
import { ViewModel } from './register';

// ViewModel unit tests
QUnit.module('register');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the register-component component');
});
