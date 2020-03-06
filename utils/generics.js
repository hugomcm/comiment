const { fromPairs, toPairs } = require('ramda');

module.exports = {
  objMap: (obj, fn) => fromPairs(toPairs(obj).map(([key, val]) => fn(key, val)))
};
