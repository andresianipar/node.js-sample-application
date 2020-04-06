function _1() {
    function foo() {
        return {
            bar: 123,
            inspect: function () {
                return `Bar is ${this.bar}`;
            }
        };
    }

    // console.log(foo());

    const name = 'Nate';
    const money = 33;

    // console.log('%s has %d dollars.', name, money);
}

function _2() {
    console.time();

    setTimeout(() => {
        console.timeEnd();
    }, 1000);

    console.time('First');

    setTimeout(() => {
        console.timeEnd('First');
    }, 2000);

    console.time('Second');

    setTimeout(() => {
        console.timeEnd('Second');
    }, 3000);
}

function _3() {
    // console.trace('trace at _3');

    // Execution continues
    // console.log('Stack trace printed');

    function foo() {
        const stack = new Error('trace at foo').stack;

        console.log(stack);

        // Execution continues
        // console.log('Stack trace printed');
    }

    foo();
}

function _4() {
    console.log('Good output');
    console.error('Error message');
}

function _5() {
    // console.log('hello');

    // const i = 10;

    // console.log('world');
}

function _6() {
    for (let i = 0; i < 10; i++) {
        let message = `Loop ${i}`;

        debugger;

        console.log(message);
    }
}

(function () {
    // 11 debugging > the console object > simple logging
    // _1();

    // 11 debugging > the console object > simple benchmark
    // _2();

    // 11 debugging > the console object > a quick way to get the call stack
    // _3();

    // 11 debugging > the console object > print to stderr
    // _4();

    // 11 debugging > the debugger statement
    // _5();

    // 11 debugging > node's built-in debugger
    // _6();
}());
