module.exports = allFunctionality => {
  const { orderInit, orderOpen, orderClose, orderPrint } = allFunctionality;
  return {
    specificFns: { orderInit, orderOpen, orderClose, orderPrint },
    defaultInitState: {
      idade: 10,
      sexo: 'M'
    }
  };
};
