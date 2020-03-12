const { objMap } = require('./generics');
const { v1: uuid } = require('uuid');

/**************** Instances Factory **************/
const buildInstance = (functionality, id, className, initState = {}) => {
  let state;

  // TODO: Check other uuid versions to improve this
  // uuid v4 autogen makes this +/-75% slower, very bad!
  // uuid v1 autogen makes this +/-38% slower, not bad!
  const _id = !id ? uuid() : id;
  const _className = className;

  // update the initial state
  if (typeof initState !== 'object') {
    console.warn('Invalid initState, defaulting to empty object');
    initState = {};
  }
  updateState({ ...initState });

  function updateState(newState) {
    // console.log({ oldState: state, newState });
    if (!!newState && newState !== state) {
      // console.log('updating...');
      state = newState;
    }
  }

  const builtInFns = {
    info: state => () => {
      console.group('Info');
      console.log('id:', _id);
      console.log('className:', _className);
      console.log('state:', state);
      console.groupEnd();
    },
    getId: state => () => _id
  };

  functionality = { ...builtInFns, ...functionality };

  const thisInstance = {
    ...objMap(functionality, ([fnName, fn]) => [
      fnName,
      (...args) => {
        updateState(fn(state)(...args));
        return thisInstance;
      }
    ])
  };

  return thisInstance;
};

module.exports = { buildInstance };
