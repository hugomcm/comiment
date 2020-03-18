module.exports = {
  open: state => ask => ({ newState: { ...state, ask } }),
  close: state => bid => ({ newState: { ...state, bid } }),
  print: state => () => {
    console.log('state', state);
    console.log('-------------------------------------');
  }
};
