module.exports = allFunctionality => {
  const { orderPrint } = allFunctionality;
  return {
    specificFns: { orderPrint },
    defaultInitState: {
      type: 'Cat',
      idade: 3,
      sexo: 'F'
    }
  };
};
