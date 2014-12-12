# cmp-key [![Build Status][travis-badge]][travis] [![Dependency Status][david-badge]][david]

[![npm](https://nodei.co/npm/cmp-key.png)](https://nodei.co/npm/cmp-key/)

[travis]: https://travis-ci.org/eush77/cmp-key
[travis-badge]: https://travis-ci.org/eush77/cmp-key.svg
[david]: https://david-dm.org/eush77/cmp-key
[david-badge]: https://david-dm.org/eush77/cmp-key.png

Make comparator from key function, less function, or both.

## Example

```js
> ['aaa', 'zz', 'd'].sort(cmpKey({
    less: function (a, b) { return a.length < b.length; }
  }))
[ 'd', 'zz', 'aaa' ]
```

## API

### `cmpKey([keyfn], [options])`

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
npm install cmp-key
```

## License

MIT
