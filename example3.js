const { Person } = require('./classes')();

const setName = state => newNameString => ({
  newState: { ...state, newNameString }
});
const newFn2 = state => mnfs => ({ newState: { ...state, mnfs } });

const res = Person();

console.log(res);
// console.log(res._info.toString());

res
  .addSkill('uma coisa', 'outra coisa', 'e mais outra')
  .setName('Person Name')
  ._info()
  ._printObjVersion()
  ._registerFn(newFn2, 'setName')
  ._printObjVersion()
  // // console.log(res);
  .setName('nova função adicionada')
  ._info()
  ._registerFn(newFn2)
  // .addSkill('agora é que vão ser elas!')
  .newFn2('nova função adicionada 2')
  ._printObjVersion()
  // .newFn('overwrite')
  ._printFnsHashTbl()
  ._info();

// console.log(res.setName === res._getFnsHashTbl('setName')[1][0]);
// console.log('newFn', res.newFn.toString());
// console.log('addSkill', res.addSkill.toString());

// console.log(res);
