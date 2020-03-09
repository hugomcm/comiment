const { curry } = require('ramda');
const { objMap } = require('./generics');

/**************** Instances Factory **************/
const buildInstance = curry((id, functionality, initState = {}) => {
  let state;

  // update the initial state
  if (typeof initState !== 'object') {
    console.warn('Invalid initState, defaulting to empty object');
    initState = {};
  }
  updateState({ id, ...initState });

  function updateState(newState) {
    // console.log({ oldState: state, newState });
    if (!!newState && newState !== state) {
      // console.log('updating...');
      state = newState;
    }
  }

  // console.log('functionality', functionality);
  return objMap(functionality, ([fnName, fn]) => [
    fnName,
    (...args) => {
      console.log(`${fnName}(${args})`);
      updateState(fn(state)(...args));
    }
  ]);
});

module.exports = { buildInstance };
