'use strict';


// Deal with missing arguments and default values.
function fixArgs (defaultFn, callee) {
  return (options, fn) => {
    if (typeof fn != 'function') {
      fn = options || defaultFn;
      options = {};
    }

    // If not options.asc, invert the result.
    const ifLess = options.asc || options.asc == null ? -1 : 1;

    return callee(ifLess, fn);
  };
}


// Comparator by key.
module.exports = fixArgs(x => x, function cmpby (ifLess, keyfn) {
  return (a, b) => {
    const ka = keyfn(a);
    const kb = keyfn(b);

    return ka === kb ? 0
      : ka < kb ? ifLess
      : -ifLess;
  };
});


// Comparator by less-than.
module.exports.less = fixArgs(null, function cmpbyLess (ifLess, lessfn) {
  return (a, b) => (
    a === b ? 0
      : lessfn(a, b) ? ifLess
      : -ifLess
  );
});
