const assert = require('assert');
const m2 = require('../02_node.js_essential_patterns/02_the_module_system_and_its_patterns');

// 2 the module system and its patterns
describe('the module system and its patterns', () => {
  // Test f1 function
  it('should get the desired results from the f1 function', () => {
    const Logger = m2.f1();

    try {
      Logger.prototype.log('Hello, World!');
    } catch (err) {
      assert.equal(err.message, 'log() function was invoked without using new');
    }

    const logger1 = new Logger('Logger 1');

    assert.equal(logger1.log('Hello, World!'), '[Logger 1] Hello, World!');
  });
});
