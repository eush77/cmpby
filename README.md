# cmpby [![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david]

[![npm](https://nodei.co/npm/cmpby.png)](https://nodei.co/npm/cmpby/)

[travis]: https://travis-ci.org/eush77/cmpby
[travis-badge]: https://travis-ci.org/eush77/cmpby.svg
[david]: https://david-dm.org/eush77/cmpby
[david-badge]: https://david-dm.org/eush77/cmpby.png

Make comparator from key function, less function, or both.

Comparator is a function that given two arguments `a` and `b` returns a number that is:
  - negative if `a` precedes `b`;
  - zero if `a` and `b` are effectively equal;
  - positive if `b` precedes `a`.

Comparators are used in such functions as `Array.prototype.sort` to set up object ordering.

Unfortunately, it is not very pleasant to define such functions, hence this module.

## Example

```js
> ['aaa', 'zz', 'd'].sort(cmpby({
    less: function (a, b) { return a.length < b.length; }
  }))
[ 'd', 'zz', 'aaa' ]
```

## API

### `cmpby([keyfn], [options])`

`keyfn` maps objects to keys.

`options.less` maps pairs of objects to boolean values.

`options.asc` controls in what order does comparator order objects (ascending or descending).

|              | Type                    | Required? | Default    |
| :----------- | :---------------------- | :-------: | :--------- |
| keyfn        | obj -> key              | No        | identity   |
| options.less | (key1, key2) -> boolean | No        | operator   |
| options.asc  | boolean                 | No        | `true`     |

## Install

```shell
npm install cmpby
```

## License

MIT
