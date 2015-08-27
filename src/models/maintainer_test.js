import QUnit from 'steal-qunit';
import Maintainer from './maintainer';

QUnit.module('models/maintainer');

QUnit.test('getList', function(){
  stop();
  Maintainer.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.attr('0.description'), 'First item');
    start();
  });
});
