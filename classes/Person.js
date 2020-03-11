module.exports = allFunctionality => {
  const { initOrder, openOrder, closeOrder, printOrder } = allFunctionality;
  return {
    specificFns: { initOrder, openOrder, closeOrder, printOrder },
    defaultInitState: {
      idade: 10,
      sexo: 'M'
    }
  };
};
