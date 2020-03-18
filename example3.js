const { Person } = require('./classes')();

const res = Person();

console.log(res);
// console.log(res._info.toString());

res.addSkill('uma coisa', 'outra coisa', 'e mais outra');
res._info();
res.addSkill('agora é que vão ser elas!');

res._info();
