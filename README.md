# Comiment

A module that joins concepts such as Composition over Inheritance, Immutability and Events together.

## Install

```
npm i https://github.com/hugomcm/comiment.git
```

## Example

### Usage

#### file: ./app.js

```js
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
const { Animal, Person } = require('comiment')('classes', 'helpers');

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
```

### Helpers

Note: The files **runner.js** and **identification.js** are automatically loaded from the package if there is no **'./helpers'** on the application directory

#### file: ./helpers/runner.js

```js
// Only Pure Functions Allowed
module.exports = {
  setMinSpeed: state => minSpeedKmh => ({
    newState: { ...state, minSpeedKmh }
  }),
  setMaxSpeed: state => maxSpeedKmh => ({
    newState: { ...state, maxSpeedKmh }
  }),
  cross: state => distanceInKm => {
    const { minSpeedKmh, maxSpeedKmh } = state;

    if (!maxSpeedKmh && !maxSpeedKmh) {
      throw 'Max or Min speed in kms not yet defined, please do that before cross anything!';
    }
    const minTimeToCross = distanceInKm / maxSpeedKmh;
    const maxTimeToCross = distanceInKm / minSpeedKmh;
    const lastCross = {
      distanceInKm,
      timeRange: [minTimeToCross, maxTimeToCross]
    };
    return {
      newState: {
        ...state,
        lastCross
      }
    };
  }
};
```

#### file: ./helpers/identification.js

```js
// Only Pure Functions Allowed
module.exports = {
  updateSkills: (currentSkills, ...newSkills) => {
    return !currentSkills ? [...newSkills] : [...currentSkills, ...newSkills];
  }
};
```

### Animal

Note: The files **Animal.js** and **Person.js** are automatically loaded from the package if there is no **'./classes/'** on the application directory

#### file: ./classes/Animal.js

```js
// Only Pure Functions Allowed
module.exports = ({
  runner_setMinSpeed,
  runner_setMaxSpeed,
  runner_cross
}) => ({
  setName: state => name => ({ newState: { ...state, name } }),
  getName: state => () => ({ return: state.name }),
  setMinSpeed: runner_setMinSpeed,
  setMaxSpeed: runner_setMaxSpeed,
  migrate: runner_cross
});
```

### Person

#### file: ./classes/Person.js

```js
// Only Pure Functions Allowed
module.exports = ({
  identification_updateSkills,
  runner_setMinSpeed,
  runner_setMaxSpeed,
  runner_cross
}) => ({
  setName: state => name => ({ newState: { ...state, name } }),
  getName: state => () => ({ return: state.name }),
  setBirthDate: state => birthDateUTS => ({
    newState: { ...state, birthDate: birthDateUTS }
  }),
  setMinSpeed: runner_setMinSpeed,
  setMaxSpeed: runner_setMaxSpeed,
  crossOver: runner_cross,
  addSkill: state => (...skills) => ({
    newState: {
      ...state,
      skills: identification_updateSkills(state.skills, ...skills)
    }
  })
});
```
