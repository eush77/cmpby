'use strict';

var cmpby = require('..');

var test = require('tape');


test('cmpby', function (t) {
  var elements = [
    {atomicNumber: 94, name: 'Plutonium', symbol: 'Pu'},
    {atomicNumber: 51, name: 'Antimony', symbol: 'Sb'},
    {atomicNumber: 30, name: 'Zinc', symbol: 'Zn'},
    {atomicNumber: 3, name: 'Lithium', symbol: 'Li'},
    {atomicNumber: 36, name: 'Krypton', symbol: 'Kr'},
  ];

  t.equal(elements.sort(cmpby(function (elem) {
    return elem.atomicNumber;
  })).map(function (elem) {
    return elem.symbol;
  }).join(''), 'LiZnKrSbPu');

  t.equal(elements.sort(cmpby({
    asc: false,
    less: function (a, b) {
      return a.name.length < b.name.length
          || a.name.length == b.name.length && a.atomicNumber < b.atomicNumber;
    }
  })).map(function (elem) {
    return elem.symbol;
  }).join(''), 'PuSbKrLiZn');

  t.deepEqual([1, 4, 2, 3].sort(cmpby()), [1, 2, 3, 4]);

  t.end();
});
