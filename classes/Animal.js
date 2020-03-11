module.exports = allFunctionality => {
  const { printOrder } = allFunctionality;
  return {
    specificFns: { printOrder },
    defaultInitState: {
      type: 'Cat',
      idade: 3,
      sexo: 'F'
    }
  };
};
