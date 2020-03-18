// Only Pure Functions Allowed
module.exports = {
  updateSkills: (currentSkills, ...newSkills) => {
    return !currentSkills ? [...newSkills] : [...currentSkills, ...newSkills];
  }
};
