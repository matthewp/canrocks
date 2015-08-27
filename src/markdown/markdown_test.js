import QUnit from 'steal-qunit';
import { ViewModel } from './markdown';

// ViewModel unit tests
QUnit.module('markdown');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the markdown-content component');
});
