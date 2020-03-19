const { buildInstance } = require('./utils/factory');
const {
  identification_updateSkills,
  runner_setMinSpeed,
  runner_setMaxSpeed,
  runner_cross
} = require('./helpers')();

const agent1 = buildInstance(
  {
    updateSkills: identification_updateSkills,
    setMinSpeed: runner_setMinSpeed,
    setMaxSpeed: runner_setMaxSpeed,
    cross: runner_cross
  },
  null,
  'TradeAgent'
);

console.log(agent1);

agent1
  .setMaxSpeed(99)
  ._info()
  .setMinSpeed(23)
  ._info()
  .cross(10)
  ._info();
