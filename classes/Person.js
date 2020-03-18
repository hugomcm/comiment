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
