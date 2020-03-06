module.exports = {
  init: state => order => ({ ...state, order }),
  open: state => () => console.log('open order'),
  close: state => () => console.log('close order'),
  print: state => () => console.log('state', state)
};
