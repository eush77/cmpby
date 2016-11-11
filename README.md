[![npm](https://nodei.co/npm/cmpby.png)](https://nodei.co/npm/cmpby/)

# cmpby

[![Build Status][travis-badge]][travis]
[![Dependency Status][david-badge]][david]

[travis]: https://travis-ci.org/eush77/cmpby
[travis-badge]: https://travis-ci.org/eush77/cmpby.svg
[david]: https://david-dm.org/eush77/cmpby
[david-badge]: https://david-dm.org/eush77/cmpby.png

Make comparator from key function or less function.

Comparator is a function that given two arguments `a` and `b` returns a number that is:
  - negative if `a` precedes `b`;
  - zero if `a` and `b` are effectively equal;
  - positive if `b` precedes `a`.

Comparators are used in such functions as `Array.prototype.sort` to set up object ordering.

## Example

```js
> ['aaa', 'zz', 'd'].sort(cmpby(a => a.length))
[ 'd', 'zz', 'aaa' ]

> ['aaa', 'zz', 'd'].sort(cmpby.less((a, b) => a.length < b.length ))
[ 'd', 'zz', 'aaa' ]
```

## API

### `cmpby([options], keyfn)`

```
keyfn :: Object -> Key
```

Constructs comparator from the key function.

### `cmpby([options], lessfn)`

```
lessfn :: (Object, Object) -> Boolean
```

Constructs comparator from the less-than function.

### `cmpby([options])`

Returns [the default comparator](http://www.ecma-international.org/ecma-262/7.0/index.html#sec-sortcompare).

#### `options.asc`

type | default | description
:--: | :-----: | :---------:
Boolean | `true` | If `false`, inverts comparator

## Install

```shell
npm install cmpby
```

## License

MIT
