const { objMap, isObject } = require('./generics');
const { v1: uuid } = require('uuid');
const EventEmitter = require('events');

/**************** Instances Factory **************/
const buildInstance = (functionality, id, className) => {
  let state = {};

  // TODO: Check other uuid versions to improve this
  // uuid v4 autogen makes this +/-75% slower, very bad!
  // uuid v1 autogen makes this +/-38% slower, not bad!
  const _id = !id ? uuid() : id;
  const _className = className;
  const _emitter = new EventEmitter();

  function updateState(newState, fnName, fn, args) {
    // console.log({ oldState: state, newState });
    if (!!newState && newState !== state) {
      // console.log(`${fnName} > updating...`);
      state = newState;
      _emitter.emit('state_updated', newState, fnName, fn, args);
    }
  }

  const _onceUpdate = cbFn => {
    _emitter.once('state_updated', cbFn);
    return thisInstance;
  };
  const _onUpdate = cbFn => {
    _emitter.on('state_updated', cbFn);
    return thisInstance;
  };

  const _injectEvent = event => {
    // console.log('> injectEvent', event);
    // console.log('OT', isObject(event));
    // console.log('AT', event instanceof Array);
    if (!isObject(event) && event instanceof Array) {
      const events = event;
      events.forEach(e => _emitter.emit('event_arrived', e));
    } else if (isObject(event)) {
      _emitter.emit('event_arrived', event);
    }
    return thisInstance;
  };
  const _onEvent = cbFn => {
    _emitter.on('event_arrived', event => cbFn(event, thisInstance));
    return thisInstance;
  };

  const builtInFns = {
    _info: state => () => {
      console.group('Info');
      console.log('id:', _id);
      console.log('className:', _className);
      console.log('state:', state);
      console.groupEnd();
    },
    _getId: () => () => ({ return: _id })
  };

  const thisInstance = {
    _onceUpdate,
    _onUpdate,
    _injectEvent,
    _onEvent,
    ...objMap({ ...builtInFns, ...functionality }, ([fnName, fn]) => [
      fnName,
      (...args) => {
        const result = fn(state)(...args);
        if (!result) {
          return thisInstance;
        } else if (!!result.newState) {
          updateState(result.newState, fnName, fn, args);
          if (!!result.return) {
            return result.return;
          } else {
            return thisInstance;
          }
        } else if (!!result.return) {
          return result.return;
        } else {
          return thisInstance;
        }
      }
    ])
  };

  return thisInstance;
};

module.exports = { buildInstance };
