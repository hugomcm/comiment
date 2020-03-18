/***
 * If the args 'classes' and 'helpers' aren't passed, the package will default to those names.
 *
 * The directories need to be created on the application root dir:
 *    ./classes/
 *    ./helpers/
 * if they don't exist there, it'll falldown to the package directories:
 *    ./node_modules/comiment/classes/
 *    ./node_modules/comiment/helpers/
 ***/
const { Animal, Person } = require('./index')('classes', 'helpers');

const onUpdateHandler = (state, fnName, fn, args) => {
  console.log(`Called: ${fnName}(${args.join(', ')});`);
  console.log(state);
};

const onEventHandler = (event, instance) => {
  const { type, payload } = event;
  switch (type) {
    case 'PERSON_UPDATE_REQUESTED': {
      instance
        .setName(`${payload.firstName} ${payload.lastName}`)
        .setBirthDate(payload.birthDateUTS);
      break;
    }
    case 'ADD_SKILLS_REQUESTED': {
      instance.addSkill(...payload.skills);
      break;
    }
    default:
      console.log(`Event '${type}' ignored!`);
  }
};

const person = Person()
  ._onUpdate(onUpdateHandler)
  .setName('Bear Grylls')
  ._onEvent(onEventHandler)
  ._injectEvent([
    {
      type: 'PERSON_UPDATE_REQUESTED',
      payload: {
        firstName: 'Hazen',
        lastName: 'Audel',
        birthDateUTS: 128304000000
      }
    },
    {
      type: 'ADD_SKILLS_REQUESTED',
      payload: {
        skills: [
          'Make fire with sticks',
          'Build a shelter',
          'Drink pee',
          'Rappel',
          'Sky diving'
        ]
      }
    }
  ])
  ._injectEvent({
    type: 'PERSON_UPDATE_REQUESTED',
    payload: {
      firstName: 'Ed',
      lastName: 'Stafford',
      birthDateUTS: 128304000002
    }
  })
  .setMinSpeed(10)
  .setMaxSpeed(30)

  // Different function name between Person and Animal, but same function under the wood.
  // ./helpers/runner.js > cross
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
  // ./helpers/runner.js > cross
  // ./classes/Animal.js > migrate: runner_cross
  .migrate(30)
  ._info();
