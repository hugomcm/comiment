const { buildInstance } = require('./utils/factory');
const { openTick, closeTick, printTick } = require('./functionality')();
console.log({ openTick, closeTick, printTick });

const agent1 = buildInstance({ openTick, closeTick, printTick });
console.log(agent1);

agent1.openTick(123123);
agent1.printTick();
agent1.openTick(523423);
agent1.printTick();
agent1.closeTick(1.92319);
agent1.printTick();
agent1.closeTick(1.92314);
agent1.printTick();
agent1.openTick(1.32367);
// agent1.getId();
agent1.info();
