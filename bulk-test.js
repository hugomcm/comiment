const { buildInstance } = require('./utils/factory');
const { tick_open, tick_close, tick_print } = require('./helpers')();
const testTimeInSecs = process.argv[2] || 5;

const start = Date.now();

let immedRef;
let i = 0;
let j = 0;
let agent1;

immedRef = setImmediate(function chunk() {
  while (i < 10000) {
    // const agent1 = buildInstance({ tick_open, tick_close, tick_print }, 'agent-' + j, initState);
    // const agent1 = buildInstance({ tick_open, tick_close, tick_print }, 'agent-' + j);
    agent1 = buildInstance({ tick_open, tick_close, tick_print }); // uuid v4 autogen makes it 75% slower, improve it!
    // agent1.tick_open(1.23123);
    // agent1.tick_close(1.92314);
    // agent1.tick_open(523423);
    // agent1.tick_close(1.129381);
    // agent1.tick_open(1.32367);
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
    // agent1.tick_print();
  }
}, intrv);
