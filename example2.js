const { Animal, Person } = require('./classes')();

console.log('--------------------------------------');
// console.log(Animal);
// console.log(Person);

const p1 = Person();
console.log(p1);
p1.printOrder();
console.log(p1.getId());

const a1 = Animal(null, { carcaca: 1 });
console.log(a1);
a1.printOrder();

const a2 = Animal();
a2.printOrder();

const a3 = Animal();
a3.printOrder();
