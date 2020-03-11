'use strict';
const { objMap, getCorrectPath } = require('../utils/generics');
const fs = require('fs');
const i = require('i')();

/************ Generic Functionality Groups Factory *************/
const buildFunctionalityGroup = (fnGroupName, fnGroup) =>
  objMap(fnGroup, ([fnName, fn]) => [
    i.camelize(`${fnName}_${fnGroupName}`, false),
    fn
  ]);

module.exports = functionalityRelPath => {
  const path = getCorrectPath(module, functionalityRelPath, 'functionality');

  return fs
    .readdirSync(path)
    .filter(f => `${path}/${f}` !== __filename && f.split('.')[1] === 'js')
    .reduce(
      (acm, file) => ({
        ...acm,
        ...buildFunctionalityGroup(
          file.split('.')[0],
          require(`${path}/${file}`)
        )
      }),
      {}
    );
};
