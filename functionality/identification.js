module.exports = {
  setName: state => name => ({ ...state, name }),
  getName: state => () => state.name
};
