// 02 variables > arrays
let foo = []

foo.push(1)
foo.unshift(2)
// console.log(foo)

// 02 variables > object literals
foo = {}
foo.bar = 123
// console.log(foo)

// 02 functions > immediately executing function
foo = 123

if (true) {
    let foo = 456
}
// console.log(foo)

// 02 functions > higher-order functions
setTimeout(function() {
    // console.log('Hello, World!')
}, 0)

function hello(something) {
    console.log('Hello, World')
}

// setTimeout(hello, 1500)

// 02 closures
let outer = function(arg) {
    let varOuter = arg

    function inner() {
        console.log(varOuter)
    }

    inner()
}

// outer('Hello, World!')

outer = function(arg) {
    let varOuter = arg

    return function() {
        console.log(varOuter)
    }
}

let callOuter = outer('Hello, World!')

// callOuter()

// 02 understanding node.js performance > node.js performance secret
function longRunning(callback) {
    setTimeout(callback, 3000)
}

function userClicked() {
    console.log('Start')
    longRunning(function() {
        console.log('Finish')
    })
}

// userClicked()

function webRequest(request) {
    console.log('Starting a long operation for request: ', request.id)
    longRunning(function() {
        console.log('Ending a long operation for request: ', request.id)
    })
}

// webRequest({ id: 1 })
// webRequest({ id: 2 })
// webRequest({ id: 3 })
// webRequest({ id: 4 })

// 02 more node.js internals > thread starvation
// console.time('timer')
setTimeout(function() {
    // console.timeEnd('timer')
}, 0)

// console.time('timeit')

function fibonacci(n) {
    if (0 == n) {
        return 0
    } else if (2 > n) {
        return 1
    } else {
        return fibonacci(n - 2) + fibonacci(n - 1)
    }
}

// console.log(fibonacci(44))
// console.timeEnd('timeit')

// 02 more javascript > everything is a reference
foo = {
    bas: 123
}

let bar = foo

bar.bas = 456
// console.log(foo.bas)
// console.log(bar.bas)

foo = {
    bas: 123
}
bar = {
    bas: foo.bas
}
bar.bas = 456
// console.log(foo.bas)
// console.log(bar.bas)

// 02 more javascript > truthy and falsy
// console.log(null == undefined)
// console.log(null === undefined)

function truthyAndFalsy() {
    // all blocks are evaluated to true
    if (!false) {
        console.log('falsy')
    }

    if (!null) {
        console.log('falsy')
    }

    if (!undefined) {
        console.log('falsy')
    }

    if (!0) {
        console.log('falsy')
    }

    if (!'') {
        console.log('falsy')
    }

    if ({}) {
        console.log('falsy')
    }
}

// truthyAndFalsy()

// 02 more javascript > revealing module pattern
function printMessage() {
    let message = 'Hello'

    function getMessage() {
        return message
    }

    function setMessage(newMessage) {
        if (!newMessage) {
            throw new Error('Cannot set empty message')
        }

        message = newMessage
    }

    function print() {
        console.log(message)
    }

    return {
        getMessage: getMessage,
        setMessage: setMessage,
        print: print
    }
}

let awesome1 = printMessage()

// awesome1.print()

let awesome2 = printMessage()

awesome2.setMessage('Hi')
// awesome2.print()
// awesome1.print()

// 02 more javascript > understanding this
foo = {
    bar: 123,
    bas: function() {
        console.log('this.bar is:', this.bar)
    }
}

// console.log('foo.bar is:', foo.bar)
// foo.bas()

foo = function() {
    console.log('Is this called from globals?', global === this ? 'Yes' : 'No')
}

// foo()

foo = {
    bar: 123
}

function bas() {
    if (global === this) {
        console.log('Called from global')
    }
    if (foo == this) {
        console.log('Called from foo')
    }
}

// bas()

foo.bas = bas
// foo.bas()

foo = function() {
    // the foo variable becomes part of the global context
    this.foo = 123
    console.log('Is this global?', global === this ? 'Yes' : 'No')
}

// foo()
// console.log(global.foo)

// let newFoo = new foo()

// console.log(newFoo.foo)

// 02 more javascript > understanding prototype
foo = function() {}
foo.prototype.bar = 123
// console.log(foo.prototype.bar)
bas = new foo()
// console.log(foo.prototype === bas.prototype)
// console.log(bas.bar)

foo = function() {}
foo.prototype.bar = 123
bas = new foo()
qux = new foo()
// console.log(123 === bas.bar)
// console.log(123 === qux.bar)
foo.prototype.bar = 456
// console.log(456 === bas.bar)
// console.log(456 === qux.bar)

foo = function() {}
foo.prototype.bar = 123
bas = new foo()
qux = new foo()
bas.bar = 456
// console.log(456 === bas.bar)
// console.log(123 === qux.bar)

function someClass() {
    this.someProperty = 'Some initial value'
}

someClass.prototype.someMemberFunction = function() {
    this.someProperty = 'Modified value'
}

let instance = new someClass()

// console.log('Some initial value' === instance.someProperty)
instance.someMemberFunction()
// console.log('Modified value' === instance.someProperty)

// 02 more javascript > error handling
try {
    setTimeout(function() {
        // console.log('About to throw an error')
        // throw new Error('Error thrown')
    }, 0)
} catch (e) {
    console.log('Catch block')
}

// console.log('I\'m outside the try block')

setTimeout(function() {
    try {
        setTimeout(function() {
            // console.log('About to throw an error')
            // throw new Error('Error thrown')
        }, 0)
    } catch (e) {
        console.log('Catch block')
    }
}, 0)

// console.log('I\'m outside the try block')

function getConnection(callback) {
    let connection

    try {
        throw new Error('Connection failed')
        callback(null, connection)
    } catch (error) {
        callback(error, null)
    }
}

getConnection(function(error, connection) {
    if (error) {
        console.log('Error:', error.message)
    } else {
        console.log('Connection succeeded:', connection)
    }
})
