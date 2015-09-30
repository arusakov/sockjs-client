var Emitter = require('./lib/event/emitter').EventEmitter;

function test() {
  var emitter = new Emitter();
  var COUNT = 1e5;

  var forTest = 0;

  // add two listeners
  emitter.on('message', function (data) {
    forTest += data.val;
  });
  emitter.on('message', function (data) {
    forTest -= data.val;
  });

  // random value
  var rndSeed = Date.now() % 10;

  var t1 = Date.now();
  for (var i = 0; i < COUNT; ++i, ++rndSeed) {
    emitter.emit('message', {
      val: rndSeed
    });
  }
  t1 = Date.now() - t1;
  console.log(t1, forTest);
}

test();
