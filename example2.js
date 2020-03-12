const { Animal, Person } = require('./classes')();
const cecil = Animal();

// TODO: Make it possible to chain operations on an instance
// const cecil = Animal().setName();
cecil.setName('Cecil');

cecil.setMinSpeed(9);
cecil.setMaxSpeed(40);
cecil.cross(30);
cecil.info();
// console.log(state);
