const f1 = function f1() {
  class Logger {
    constructor(name1) {
      this.name = name1;
    }

    log(message) {
      if (this instanceof Logger) {
        return `[${this.name}] ${message}`;
      }

      throw new Error('log() function was invoked without using new');
    }
  }

  return Logger;
};

const f2 = function f2() {
  return () => {
    // console.log('Hello, World!');
  };
};

module.exports = {
  f1,
  f2,
};
