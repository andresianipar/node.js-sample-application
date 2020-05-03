// const m1 = require('./01_the_callback_pattern');
// const m2 = require('./02_the_module_system_and_its_patterns');
// const m3 = require('./03_the_observer_pattern');

const f1 = function f1() {
  // 1 the callback pattern > synchronous or asynchronous? > an unpredictable function
  // m1.f1();

  // 1 the callback pattern > synchronous or asynchronous? > unleashing zalgo
  // m1.f2();

  // 1 the callback pattern > synchronous or asynchronous? > using synchronous apis
  // m1.f3();
  // m1.f4();

  // 1 the callback pattern > synchronous or asynchronous? > deferred execution
  // m1.f4();

  // 1 the callback pattern > node.js callback conventions > propagating errors
  // m1.f5();

  // 1 the callback pattern > node.js callback conventions > uncaught exceptions
  // m1.f6();
};

const f2 = function f2() {
  // 2 the module system and its patterns > module definition patterns > exporting a constructor
  try {
    // m2.f1().prototype.log('Hello, World!');
  } catch (err) {
    // console.log(err);
  }

  // const Logger = m2.f1();
  // const logger1 = new Logger('Logger 1');

  // console.log(logger1.log('Hello, World!'));

  // 2 the module system and its patterns > module definition patterns >
  // modifying other modules or the global scope
  // require('./02_the_module_system_and_its_patterns').customMessage = () => {
  //   console.log('This is a new functionality');
  // };

  // const m2Temp = require('./02_the_module_system_and_its_patterns');

  // m2Temp.f2()();
  // m2Temp.customMessage();
};

const f3 = function f3() {
  // 3 the observer pattern > creating and using eventemitter
  // m3.f1();

  // 3 the observer pattern > making any object observable
  // m3.f2();

  // 3 the observer pattern > combining callbacks and eventemitter
  // m3.f3();
};

// 1 the callback pattern
f1();

// 2 the module system and its patterns
f2();

// 3 the observer pattern
f3();
