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

    // If not options.asc, invert the result.
    const ifLess = options.asc || options.asc == null ? -1 : 1;

    return callee(ifLess, fn);
  };
}


// Comparator by key.
module.exports = fixArgs(function cmpby (ifLess, keyfn) {
  if (!keyfn) {
    // Return the default comparator.
    return sortCompare;
  }

  return (a, b) => {
    const ka = keyfn(a);
    const kb = keyfn(b);

    return ka === kb ? 0
      : ka < kb ? ifLess
      : -ifLess;
  };
});


// Comparator by less-than.
module.exports.less = fixArgs(function cmpbyLess (ifLess, lessfn) {
  return (a, b) => (
    a === b ? 0
      : lessfn(a, b) ? ifLess
      : -ifLess
  );
});
