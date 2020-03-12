'use strict';
const fs = require('fs');
const { getCorrectPath } = require('../utils/generics');
const { buildInstance } = require('../utils/factory');

module.exports = (classRelPath, functionalityRelPath) => {
  try {
    const path = getCorrectPath(module, classRelPath);
    const fns = require('../functionality')(functionalityRelPath);
    const buildClassesGroup = (className, classFn) => ({
      [className]: id => buildInstance(classFn(fns), id, className)
    });

    return fs
      .readdirSync(path)
      .filter(f => `${path}/${f}` !== __filename && f.split('.')[1] === 'js')
      .reduce(
        (acm, file) => ({
          ...acm,
          ...buildClassesGroup(file.split('.')[0], require(`${path}/${file}`))
        }),
        {}
      );
  } catch (err) {
    console.error('err', err);
  }
};
