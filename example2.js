const { Animal, Person } = require('./classes')();

const eventHandler = (event, instance) => {
  const { type, payload } = event;
  switch (type) {
    case 'CREATE_PERSON': {
      instance
        .setName(`${payload.firstName} ${payload.lastName}`)
        .setBirthDate(payload.birthDate);
      break;
    }
    case 'ADD_SKILLS': {
      instance.addSkill(...payload.skills);
      break;
    }
    default:
      console.log(`Event '${type}' ignored!`);
  }
};

const person = Person()
  ._onUpdate((state, fnName, fn, args) => {
    console.log(`Called: ${fnName}(${args.join(', ')});`);
    console.log(state);
  })
  .setName('Bear Grylls')
  ._onEvent(eventHandler)
  ._injectEvent([
    {
      type: 'CREATE_PERSON',
      payload: {
        firstName: 'Hazen',
        lastName: 'Audel',
        birthDate: 128304000000
      }
    }
  ])
  ._injectEvent({
    type: 'CREATE_PERSON',
    payload: {
      firstName: 'Ed',
      lastName: 'Stafford',
      birthDate: 128304000002
    }
  })
  ._injectEvent({
    type: 'ADD_SKILLS',
    payload: {
      skills: [
        'Make fire with sticks',
        'Build a shelter',
        'Drink pee',
        'Rappel',
        'Sky diving'
      ]
    }
  })
  .setMinSpeed(10)
  .setMaxSpeed(30)

  // Different function name between Person and Animal, but same function under the wood.
  // ./functionality/runner.js > cross
  // ./classes/Person.js > crossOver: runner_cross
  .crossOver(120)

  // Internal method to print the state of the instance
  ._info();

console.log('Name:', person.getName());
console.log('Id:', person._getId());

Animal()
  .setName('Cecil')
  .setMinSpeed(10)
  .setMaxSpeed(50)

  // Different function name between Person and Animal, but same function under the wood.
  // ./functionality/runner.js > cross
  // ./classes/Animal.js > migrate: runner_cross
  .migrate(30)
  ._info();
