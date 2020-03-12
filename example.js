const { buildInstance } = require('./utils/factory');
const { tick_open, tick_close, tick_print } = require('./functionality')();

const agent1 = buildInstance(
  { tick_open, tick_close, tick_print },
  null,
  'TradeAgent'
);
console.log(agent1);

agent1.tick_open(123123);
agent1.tick_print();
agent1.tick_open(523423);
agent1.tick_print();
agent1.tick_close(1.92319);
agent1.tick_print();
agent1.tick_close(1.92314);
agent1.tick_print();
agent1.tick_open(1.32367);
// agent1.getId();
agent1.info();
