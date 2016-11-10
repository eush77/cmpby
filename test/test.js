'use strict';

const cmpby = require('..');

const test = require('tape');


const elements = [
  { atomicNumber: 94, name: 'Plutonium', symbol: 'Pu' },
  { atomicNumber: 51, name: 'Antimony', symbol: 'Sb' },
  { atomicNumber: 30, name: 'Zinc', symbol: 'Zn' },
  { atomicNumber: 3, name: 'Lithium', symbol: 'Li' },
  { atomicNumber: 36, name: 'Krypton', symbol: 'Kr' },
];


test('cmpby', t => {
  t.deepEqual(['aaa', 'zz', 'd'].sort(cmpby(a => a.length)),
              ['d', 'zz', 'aaa']);

  t.deepEqual(['aaa', 'zz', 'd'].sort(cmpby({ asc: false }, a => a.length)),
              ['aaa', 'zz', 'd']);

  t.equal(
    elements
      .sort(cmpby(elem => elem.atomicNumber))
      .map(elem => elem.symbol)
      .join(''),
    'LiZnKrSbPu');

  t.deepEqual([1, 4, 2, 3].sort(cmpby()), [1, 2, 3, 4]);

  {
    const array = [0, 10, 2, 'a', false, null, true, 'z',
                   undefined, undefined];

    t.deepEqual([...array].sort(cmpby()), [...array].sort());
  }

  t.deepEqual(['1', 1].sort(cmpby(x => x)),
              ['1', 1].sort(),
              'should always use lessfn in comparison, not == or ===');

  t.end();
});


test('cmpby.less', t => {
  t.deepEqual(
    ['aaa', 'zz', 'd'].sort(cmpby.less((a, b) => a.length < b.length)),
    ['d', 'zz', 'aaa']);

  t.equal(
    elements
      .sort(cmpby.less({ asc: false }, (a, b) => (
        a.name.length < b.name.length
          || a.name.length == b.name.length && a.atomicNumber < b.atomicNumber
      )))
      .map(elem => elem.symbol)
      .join(''),
    'PuSbKrLiZn');

  t.deepEqual(['1', 1].sort(cmpby.less((x, y) => x < y)),
              ['1', 1].sort(),
              'should always use lessfn in comparison, not == or ===');

  t.end();
});
