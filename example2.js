const { Animal, Person } = require('./classes')();
const cecil = Animal();
const simba = Animal();

simba
  .setName('Simba')
  .setMinSpeed(10)
  .info();

cecil
  .setName('Cecil')
  .setMinSpeed(9)
  .setMaxSpeed(40)
  .cross(30)
  .info();

// console.log(simba, cecil);
