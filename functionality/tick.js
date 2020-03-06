module.exports = {
  open: state => ask => ({ ...state, ask }),
  close: state => bid => ({ ...state, bid }),
  print: state => () => {
    console.log('state', state);
    console.log('-------------------------------------');
  }
};
