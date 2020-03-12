module.exports = allFunctionality => {
  const {
    identification_setName,
    runner_setMinSpeed,
    runner_setMaxSpeed,
    runner_cross
  } = allFunctionality;
  return {
    specificFns: {
      setName: identification_setName,
      setMinSpeed: runner_setMinSpeed,
      setMaxSpeed: runner_setMaxSpeed,
      cross: runner_cross
    }
  };
};
