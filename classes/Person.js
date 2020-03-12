module.exports = allFunctionality => {
  const { identification_setName, identification_getName } = allFunctionality;
  return {
    specificFns: {
      setName: identification_setName,
      getName: identification_getName
    }
  };
};
