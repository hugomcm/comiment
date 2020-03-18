'use strict';
const { objMap, getCorrectPath } = require('../utils/generics');
const fs = require('fs');

/************ Generic helpers Groups Factory *************/
const buildHelpersGroup = (fnGroupName, fnGroup) =>
  objMap(fnGroup, ([fnName, fn]) => [`${fnGroupName}_${fnName}`, fn]);

module.exports = helpersRelPath => {
  const path = getCorrectPath(module, helpersRelPath, 'helpers');

  return fs
    .readdirSync(path)
    .filter(f => `${path}/${f}` !== __filename && f.split('.')[1] === 'js')
    .reduce(
      (acm, file) => ({
        ...acm,
        ...buildHelpersGroup(file.split('.')[0], require(`${path}/${file}`))
      }),
      {}
    );
};
