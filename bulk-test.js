const { buildInstance } = require('./utils/factory');
const { tickOpen, tickClose, tickPrint } = require('./functionality')();
const testTimeInSecs = process.argv[2] || 5;

const start = Date.now();
const initState = {
  name: null,
  ask: null,
  bid: null,
  positions: [],
  orders: []
};

let immedRef;
let i = 0;
let j = 0;
let agent1;

immedRef = setImmediate(function chunk() {
  while (i < 10000) {
    // const agent1 = buildInstance({ tickOpen, tickClose, tickPrint }, 'agent-' + j, initState);
    // const agent1 = buildInstance({ tickOpen, tickClose, tickPrint }, 'agent-' + j);
    agent1 = buildInstance({ tickOpen, tickClose, tickPrint }); // uuid v4 autogen makes it 75% slower, improve it!
    // agent1.tickOpen(1.23123);
    // agent1.tickClose(1.92314);
    // agent1.tickOpen(523423);
    // agent1.tickClose(1.129381);
    // agent1.tickOpen(1.32367);
    i++;
    j++;
  }
  immedRef = setImmediate(chunk);
  i = 0;
});

const intrv = 1000;
const intRef = setInterval(() => {
  const seconds = (Date.now() - start) / intrv;
  // console.log({ seconds, j, 'insts/sec': j / seconds });
  if (seconds > testTimeInSecs) {
    console.log({ seconds, j, 'insts/sec': j / seconds });
    clearInterval(intRef);
    clearImmediate(immedRef);
    // agent1.tickPrint();
  }
}, intrv);
