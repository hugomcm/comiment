const { objMap, isObject } = require('./generics');
const { v1: uuid } = require('uuid');
const EventEmitter = require('events');
// const crypto = require('crypto');
// const secret = 'ASPrkc934t8y29SSDFA=KD=Ces9fk39r983ru209k3se293e';

/**************** Instances Factory **************/
const buildInstance = (classFns, id, className) => {
  let state = {};

  // TODO: Check other uuid versions to improve this
  // uuid v4 autogen makes this +/-75% slower, very bad!
  // uuid v1 autogen makes this +/-38% slower, not bad!
  const _id = !id ? uuid() : id;
  const _className = className;
  const _emitter = new EventEmitter();
  const _fnTable = {};
  let _version = 0;

  function _printFnsHashTbl() {
    console.log(_fnTable);
    return thisInstance;
  }
  function _getFnsHashTbl(fnName) {
    return _fnTable[fnName];
  }

  function updateState(newState, fnName, fn, args) {
    if (!!newState && newState !== state) {
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

  const _injectEvent = events => {
    // Multiple events
    if (!isObject(events) && events instanceof Array) {
      events.forEach(e => _emitter.emit('event_arrived', e));
    } // One event
    else if (isObject(events)) {
      _emitter.emit('event_arrived', events);
    }
    return thisInstance;
  };
  const _onEvent = cbFn => {
    _emitter.on('event_arrived', event => cbFn(event, thisInstance));
    return thisInstance;
  };

  const _wrapFn = (fn, fnName) => (...args) => {
    const result = fn(state)(...args);
    if (!result) {
      return thisInstance;
    } else if (!!result.newState) {
      updateState(result.newState, fnName, fn, args);
      if (!result.return) {
        return thisInstance;
      } else {
        return result.return;
      }
    } else if (!!result.return) {
      return result.return;
    } else {
      return thisInstance;
    }
  };

  const _registerFn = (fn, fnName) => {
    const getNextVersionNr = hashTblFn => hashTblFn.length + 1;
    const getLastVersion = hashTblFn => hashTblFn[hashTblFn.length - 1][0];

    if (!fnName && !fn.name) {
      throw 'Anonymous function passed, name your function or pass the name for your function';
    } else if (!fnName && fn.name) {
      fnName = fn.name;
    }

    // Makes the buildInstance too slow!!!
    // const fnHash = crypto
    //   .createHmac('sha256', secret)
    //   .update(fnName + fn.toString())
    //   .digest('hex')
    //   .toString();

    const fnVersion = !_fnTable[fnName]
      ? 1
      : getNextVersionNr(_fnTable[fnName]);

    // Register Function
    _fnTable[fnName] = !_fnTable[fnName]
      ? [[_wrapFn(fn, fnName), /*fnHash,*/ fnVersion]]
      : [..._fnTable[fnName], [_wrapFn(fn, fnName), /*fnHash,*/ fnVersion]];

    thisInstance[fnName] = getLastVersion(_fnTable[fnName]);
    _incObjVersion();

    return thisInstance;
  };

  const _incObjVersion = () => _version++;
  const _printObjVersion = () => {
    console.log(`v${_version}`);
    return thisInstance;
  };
  const _getObjVersion = () => _version;

  const builtInFns = {
    _info: () => {
      console.group('Info');
      console.log('id:', _id);
      console.log('className:', _className);
      console.log('state:', state);
      console.groupEnd();
      return thisInstance;
    },
    _getId: () => _id,
    _onceUpdate,
    _onUpdate,
    _injectEvent,
    _onEvent,
    _registerFn,
    _printFnsHashTbl,
    _getFnsHashTbl,
    _printObjVersion,
    _getObjVersion
  };

  const thisInstance = {
    ...objMap(builtInFns, ([fnName, fn]) => [fnName, (...args) => fn(...args)])
  };

  // Register class functions
  Object.keys(classFns).forEach(fnName =>
    _registerFn(classFns[fnName], fnName)
  );

  return thisInstance;
};

module.exports = { buildInstance };
