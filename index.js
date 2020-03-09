const fs = require('fs');
const { buildInstance } = require('./utils/factory');

function getFunctionality(path) {
  // TODO: accept a path name
  // console.log('path', path);
  // path = !!path ? `${module.parent.path}/functionality` : './functionality';

  const hasFiles = path =>
    fs.existsSync(path) && fs.readdirSync(path).length > 0;

  let tryoutFunctionalityLoadingPath = `${module.parent.path}/functionality`;

  const functionalityLoadingPath = hasFiles(tryoutFunctionalityLoadingPath)
    ? tryoutFunctionalityLoadingPath
    : `${__dirname}/functionality`;

  return require('./functionality')(functionalityLoadingPath);
}

module.exports = { buildInstance, getFunctionality };
