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
console.log('mdp', module.parent.parent.path);

module.exports = functionalityLoadingPath =>
  fs
    // .readdirSync(__dirname)
    .readdirSync(functionalityLoadingPath)
    .filter(
      f =>
        // `${__dirname}/${f}` !== __filename &&
        `${functionalityLoadingPath}/${f}` !== __filename &&
        f.split('.')[1] === 'js'
    )
    .reduce((acm, file) => {
      // console.log('file', file);
      // console.log(
      //   '${functionalityLoadingPath}/${file}',
      //   `${functionalityLoadingPath}/${file}`
      // );
      return {
        ...acm,
        // ...buildFunctionalityGroup(file.split('.')[0], require(`./${file}`))
        ...buildFunctionalityGroup(
          file.split('.')[0],
          require(`${functionalityLoadingPath}/${file}`)
        )
      };
    }, {});
