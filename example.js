const { buildInstance } = require('./utils/factory');
const { tickOpen, tickClose, tickPrint } = require('./functionality')();
// console.log({ tickOpen, tickClose, tickPrint });

const agent1 = buildInstance({ tickOpen, tickClose, tickPrint });
console.log(agent1);

agent1.tickOpen(123123);
agent1.tickPrint();
agent1.tickOpen(523423);
agent1.tickPrint();
agent1.tickClose(1.92319);
agent1.tickPrint();
agent1.tickClose(1.92314);
agent1.tickPrint();
agent1.tickOpen(1.32367);
// agent1.getId();
agent1.info();
