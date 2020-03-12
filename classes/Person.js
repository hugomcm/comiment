module.exports = ({
  identification_setName,
  identification_getName,
  identification_setBirthDate,
  identification_addSkill,
  runner_setMinSpeed,
  runner_setMaxSpeed,
  runner_cross
}) => ({
  setName: identification_setName,
  getName: identification_getName,
  setBirthDate: identification_setBirthDate,
  setMinSpeed: runner_setMinSpeed,
  setMaxSpeed: runner_setMaxSpeed,
  crossOver: runner_cross,
  addSkill: identification_addSkill
});
