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
