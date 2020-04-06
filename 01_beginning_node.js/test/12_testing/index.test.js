// 12 testing > mocha > creating and running a basic test
describe('our test suite', () => {
    const assert = require('assert');
    let index = require('../../12_testing/index');

    it('should pass this test', () => {
        assert.equal(10, index._1(true));
    });

    it('should fail this test', () => {
        assert.equal(10, index._1(false));
    });
});

// 12 testing > mocha > mocha api > hooks
describe('our test suite', () => {
    const assert = require('assert');
    let i = 0;

    beforeEach(() => {
        i++;
    });

    it('test 1', () => {
        assert.equal(1, i);
    });

    it('test 2', () => {
        assert.equal(2, i);
    });
});

// 12 testing > mocha > async testing
describe('our test suite', () => {
    let index = require('../../12_testing/index');

    it('test simulateAsync', () => {
        index._2((err) => {
            if (err) {
                throw err;
            }
        });
    });

    it('this should pass', (done) => {
        setTimeout(() => {
            done();
        }, 1000);
    });

    it('this should fail', (done) => {
        setTimeout(() => {
            done(new Error('fail'));
        }, 1000);
    });

    it('this should pass', async () => {
        setTimeout(() => { }, 1000);
    });

    it('this should fail', async (done) => {
        try {
            setTimeout(() => {
                throw new Error('fail');
            }, 1000);
        } catch (err) {
            done(err);
        }
    });
});

// 12 testing > mocha > async testing > testing promises
describe('our test suite', () => {
    const q = require('q');

    it('this should pass', () => {
        return q.when('pass');
    });

    it('this should fail', () => {
        return q.reject(new Error('fail'));
    });
});
