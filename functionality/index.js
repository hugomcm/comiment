const { curry } = require('ramda');
const { objMap } = require('../utils/generics');
const i = require('i')();
const fs = require('fs');

/************ Generic Functionality Groups Factory *************/
const buildFunctionalityGroup = curry((fnGroupName, fnGroup) =>
  objMap(fnGroup, ([fnName, fn]) => [
    i.camelize(`${fnName}_${fnGroupName}`, false),
    fn
  ])
);

module.exports = fs
  .readdirSync(__dirname)
  .filter(f => `${__dirname}/${f}` !== __filename && f.split('.')[1] === 'js')
  .reduce(
    (acm, file) => ({
      ...acm,
      ...buildFunctionalityGroup(file.split('.')[0], require(`./${file}`))
    }),
    {}
  );
