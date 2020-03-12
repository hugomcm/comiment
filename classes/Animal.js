module.exports = ({
  identification_setName,
  identification_getName,
  runner_setMinSpeed,
  runner_setMaxSpeed,
  runner_cross
}) => ({
  setName: identification_setName,
  getName: identification_getName,
  setMinSpeed: runner_setMinSpeed,
  setMaxSpeed: runner_setMaxSpeed,
  migrate: runner_cross
});
