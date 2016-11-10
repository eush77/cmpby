'use strict';


// Default comparator: ES7 22.1.3.25.1.
function sortCompare (x, y) {
  // 1. If x and y are both undefined, return +0.
  if (x === undefined && y === undefined) {
    return 0;
  }

  // 2. If x is undefined, return 1.
  if (x === undefined) {
    return 1;
  }

  // 3. If y is undefined, return -1.
  if (y === undefined) {
    return -1;
  }

  // 5. Let xString be ? ToString(x).
  x = String(x);

  // 6. Let yString be ? ToString(y).
  y = String(y);

  // 7. Let xSmaller be the result of performing Abstract Relational
  //    Comparison xString < yString.
  // 8. If xSmaller is true, return -1.
  // 9. Let ySmaller be the result of performing Abstract Relational
  //    Comparison yString < xString.
  // 10. If ySmaller is true, return 1.
  // 11. Return +0.
  return (x < y) ? -1 : (x > y) ? 1 : 0;
}


// Deal with missing arguments and default values.
function fixArgs (callee) {
  return (options, fn) => {
    if (typeof fn != 'function' && typeof options == 'function') {
      fn = options;
      options = {};
    }
    else {
      options = options || {};
    }

    options.asc = options.asc || options.asc == null;

    return callee(options, fn);
  };
}


// Core comparator logic.
function compare (options, less, x, y) {
  const ifLess = options.asc ? -1 : 1;

  return less(x, y) ? ifLess
    : less(y, x) ? -ifLess
    : 0;
}


// Comparator by key.
module.exports = fixArgs(function cmpby (options, key) {
  if (!key) {
    // Return the default comparator.
    return sortCompare;
  }

  return (x, y) =>
    compare(options, (x, y) => x < y, key(x), key(y));
});


// Comparator by less-than - binds `compare` to arguments passed by `fixArgs`.
module.exports.less = fixArgs(Function.bind.bind(compare, null));
