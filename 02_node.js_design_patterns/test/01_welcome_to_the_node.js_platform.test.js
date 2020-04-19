const assert = require('assert');
const m1 = require('../01_welcome_to_the_node.js_platform/02_introduction_to_node.js_6_and_es2015');

// 2 introduction to node.js 6 and es2015 > the arrow function
describe('the arrow function', () => {
  // Test f2 function
  it('should get the desired results from the f2 function', () => {
    assert.equal(m1.f2(), undefined);
  });
});

// 2 introduction to node.js 6 and es2015 > class syntax
describe('class syntax', () => {
  // Test f3 function
  it('should get the desired results from the f3 function', () => {
    const f3 = m1.f3();

    assert.equal(f3.bobFullName, 'Bob the Builder');
    assert.equal(f3.oldest.age, 13);
  });

  // Test f4 function
  it('should get the desired results from the f4 function', () => {
    const f4 = m1.f4();

    assert.equal(f4.bobFullName, 'Bob the Builder');
    assert.equal(f4.oldest.age, 13);
  });
});

// 2 introduction to node.js 6 and es2015 > enhanced object literals
describe('enhanced object literals', () => {
  // Test f5 function
  it('should get the desired results from the f5 function', () => {
    assert.equal(m1.f5(), 'Alan Turing');
  });
});

// 2 introduction to node.js 6 and es2015 > map and set collections
describe('map and set collections', () => {
  // Test f6 function
  it('should get the desired results from the f6 function', () => {
    const f6 = m1.f6();

    assert.equal(f6.size, 2);
    assert.equal(f6.has('twitter'), true);
    assert.equal(f6.get('twitter'), '@lordvoldemort');
    assert.equal(f6.has('facebook'), false);
    assert.equal(f6.has('reddit'), true);
    assert.equal(f6.get('reddit'), 'lordvoldemort666');
  });

  // Test f7 function
  it('should get the desired results from the f7 function', () => {
    const f7 = m1.f7();

    f7.forEach((value, key) => {
      assert.equal(key(), value);
    });
  });

  // Test f8 function
  it('should get the desired results from the f8 function', () => {
    const f8 = m1.f8();

    assert.equal(f8.size, 4);
    assert.equal(f8.has(1), false);
    assert.equal(f8.has(5), true);
  });
});

// 2 introduction to node.js 6 and es2015 > weakmap and weakset collections
describe('weakmap and weakset collections', () => {
  // Test f9 function
  it('should get the desired results from the f9 function', () => {
    assert.equal(m1.f9().get({}), undefined);
  });

  // Test f10 function
  it('should get the desired results from the f10 function', () => {
    const f10 = m1.f10();
    const { obj1, obj2, set } = f10;

    assert.equal(set.has(obj1), false);
    assert.equal(set.has(obj2), true);
  });
});
