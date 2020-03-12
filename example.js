const { buildInstance } = require('./utils/factory');
const { tick_open, tick_close, tick_print } = require('./functionality')();

const agent1 = buildInstance(
  { tick_open, tick_close, tick_print },
  null,
  'TradeAgent'
);

console.log(agent1);

agent1
  .tick_open(123123)
  .tick_print()
  .tick_open(523423)
  .tick_print()
  .tick_close(1.92319)
  .tick_print()
  .tick_close(1.92314)
  .tick_print()
  .tick_open(1.32367)
  ._info();
