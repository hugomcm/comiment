const { fromPairs, toPairs } = require('ramda');

module.exports = {
  objMap: (obj, fn) => fromPairs(toPairs(obj).map(fn))
  // objMap: (obj, fn) => Object.fromEntries(Object.entries(obj).map(fn)) // Vanilla JS is Slower
};
