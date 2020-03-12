const fs = require('fs');
const { fromPairs, toPairs } = require('ramda');

// const objMap = (obj, fn) => Object.fromEntries(Object.entries(obj).map(fn)); // Vanilla JS is Slower
const objMap = (obj, fn) => fromPairs(toPairs(obj).map(fn));

const getCorrectPath = (executionModule, relPath, defaultDir = 'classes') => {
  const getTopModulePath = m =>
    !!m.parent ? getTopModulePath(m.parent) : m.path;
  const hasFiles = path =>
    fs.existsSync(path) && fs.readdirSync(path).length > 0;

  if (!!relPath && typeof relPath !== 'string') {
    throw `Invalid path, only strings are allowed.`;
  }

  const appPath = getTopModulePath(executionModule);
  const modulePath = executionModule.path;

  let path = !!relPath ? `${appPath}/${relPath}` : `${appPath}/${defaultDir}`;

  if (!hasFiles(path)) {
    console.warn(
      `Path '${path}' does not exist.\nFalling back to example files on '${modulePath}'`
    );
    path = modulePath;
  }

  return path;
};

const isObject = variable =>
  Object.prototype.toString.call(variable) === '[object Object]';

module.exports = {
  objMap,
  getCorrectPath,
  isObject
};
