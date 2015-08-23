import F from 'funcunit';
import QUnit from 'steal-qunit';

F.attach(QUnit);

QUnit.module('canrocks functional smoke test', {
  beforeEach() {
    F.open('/');
  }
});

QUnit.test('canrocks main page shows up', function() {
  F('title').text('canrocks', 'Title is set');
});
