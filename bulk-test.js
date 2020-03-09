const { buildInstance } = require('./utils/factory');
const allFunctionality = require('./functionality');

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

immedRef = setImmediate(function chunk() {
  while (i < 10000) {
    const agent1 = buildInstance('agent-' + j, allFunctionality, initState);
    // agent1.openTick(1.23123);
    // agent1.closeTick(1.92314);
    // agent1.openTick(523423);
    // agent1.closeTick(1.129381);
    // agent1.openTick(1.32367);
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
  }
}, intrv);
