'use strict';

var declared = require('declared');


/**
 * Create comparator by key.
 *
 * @arg {obj -> key} [keyfn] - Key function, identity by default.
 * @arg {Object} [options]
 * @property {(key1, key2) -> boolean} [less] - Key comparison function.
 * @property {boolean} [asc=true] - Ascending or descending.
 * @return {(obj1, obj2) -> number}
 */
module.exports = function (keyfn, options) {
  if (typeof keyfn != 'function') {
    options = keyfn;
    keyfn = function (x) { return x; };
  }

  options = options || {};
  options.less = options.less || function (a, b) { return a < b; };
  options.asc = declared(options.asc, true);

  return function (a, b) {
    var ka = keyfn(a);
    var kb = keyfn(b);

    if (ka === kb) {
      return 0;
    }

    var keyLess = options.less(ka, kb);
    return (options.asc ? keyLess : !keyLess) ? -1 : 1;
  };
};
