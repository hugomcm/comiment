const { buildInstance } = require('./utils/factory');

function getFunctionality(path = './functionality') {
  return require(path);
}

module.exports = { buildInstance, getFunctionality };
