module.exports = {
  setName: state => name => ({ newState: { ...state, name } }),
  getName: state => () => ({ return: state.name }),
  setBirthDate: state => birthDateUTS => ({
    newState: { ...state, birthDate: birthDateUTS }
  }),
  addSkill: state => (...newSkills) => {
    const mixedSkills = !state.skills
      ? [...newSkills]
      : [...state.skills, ...newSkills];
    return {
      newState: { ...state, skills: mixedSkills }
    };
  }
};
