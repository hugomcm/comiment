const { buildInstance } = require('./utils/factory');
const { openTick, closeTick, printTick } = require('./functionality');

const agent1 = buildInstance('agent1', { openTick, closeTick, printTick });

agent1.openTick(123123);
agent1.printTick();
agent1.openTick(523423);
agent1.printTick();
agent1.closeTick(1.92319);
agent1.printTick();
agent1.closeTick(1.92314);
agent1.printTick();
agent1.openTick(1.32367);
