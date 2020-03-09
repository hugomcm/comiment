const { buildInstance } = require('./utils/factory');

function getFunctionality(path = './functionality') {
  console.log('dasddas');
  return require(path);
}

module.exports = { buildInstance, getFunctionality };
