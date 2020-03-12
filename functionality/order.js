module.exports = {
  init: state => order => ({ newState: { ...state, order } }),
  open: state => () => console.log('open order'),
  close: state => () => console.log('close order'),
  print: state => () => console.log('state', state)
};
