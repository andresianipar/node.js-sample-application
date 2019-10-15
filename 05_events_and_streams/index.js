// 05 classical inheritance in javascript > arriving at an inheritance pattern
function Animal(name) {
    this.name = name
}

Animal.prototype.walk = function(dest) {
    return `${this.name} is walking to ${dest}`
}

let cheetah = new Animal('cheetah')

// console.log('cheetah is walking to nearest jungle' === cheetah.walk('nearest jungle'))

// 05 classical inheritance in javascript > arriving at an inheritance pattern > calling the parent constructor
let foo = {}
let bar = {}

function func(val) {
    this.val = val
}

func.call(foo, 123)
func.call(bar, 456)
// console.log(123 === foo.val)
// console.log(456 === bar.val)

function Bird(name) {
    Animal.call(this, name)
}

Bird.prototype = Animal.prototype

let eagle = new Bird('eagle')

// console.log('eagle is walking to nearest water source' === eagle.walk('nearest water source'))
Bird.prototype.fly = function(dest) {
    return `${this.name} is flying to ${dest}`
}

// console.log('eagle is flying to East America' === eagle.fly('East America'))

// 05 classical inheritance in javascript > the constructor property
// console.log(Animal === Animal.prototype.constructor)
// console.log(Animal === Bird.prototype.constructor)
// console.log('Animal' === eagle.constructor.name)
// console.log(Animal === eagle.constructor)

// 05 classical inheritance in javascript > deeper understanding of the internals of util.inherits
foo = {}
bar = Object.create(foo)
// console.log(foo.prototype === bar.prototype)

function Animal() {}

Animal.prototype.breath = function() {
    return `breathing`
}

function Human() {}

Human.prototype = Object.create(Animal.prototype)

let human = new Human()

// console.log('breathing' === human.breath())

function Dog() {}

Dog.prototype = Object.create(Animal.prototype, {
    constructor: {
        value: Dog,
        enumerable: false,
        writable: true,
        configurable: true
    }
})

let dog = new Dog()

// console.log('breathing' === dog.breath())
// console.log(Dog === dog.constructor)

// 05 node.js events > eventemitter class
let eventEmitter = require('events').EventEmitter
let emitter = new eventEmitter()

emitter.on('foo1', function(arg1, arg2) {
    console.log(`foo1 raised, args: ${arg1}, ${arg2}`)
})

// emitter.emit('foo1', 123, 456)

// 05 node.js events > eventemitter class > multiple subscribers
emitter.on('foo2', function(arg1) {
    console.log(`subscriber 1, args: ${arg1}`)
})
emitter.on('foo2', function() {
    console.log(`subscriber 2`)
})

// emitter.emit('foo2', 123)

emitter.on('foo2', function(arg1, arg2) {
    console.log(`foo2 raised, args: ${arg1}, ${arg2}`)
})

// emitter.emit('foo2', 123)

emitter.on('foo3', function(ev) {
    console.log(`subscriber 1: ${ev}`)
    ev.handled = true
})

emitter.on('foo3', function(ev) {
    if (ev.handled) {
        console.log('event already handled')
    }
})

// emitter.emit('foo3', { handled: false })

// 05 node.js events > eventemitter class > unsubscribing
let fooHandler = function() {
    console.log('handler called')

    emitter.removeListener('foo4', fooHandler)
}

emitter.on('foo4', fooHandler)
// emitter.emit('foo4')
// emitter.emit('foo4')

// 05 node.js events > eventemitter class > has this event ever been raised?
emitter.once('foo5', function() {
    console.log('foo5 has been raised')
})

// emitter.emit('foo5')
// emitter.emit('foo5')

// 05 node.js events > eventemitter class > listener management
emitter.on('foo6', function a() {})
emitter.on('foo6', function b() {})
// console.log(emitter.listeners('foo6'))

emitter.on('removeListener', function(eventName, listenerFunction) {
    console.log(eventName, 'listener removed', listenerFunction.name)
})
emitter.on('newListener', function(eventName, listenerFunction) {
    console.log(eventName, 'listener added', listenerFunction.name)
})

function a() {}

function b() {}

// emitter.on('foo6', a)
// emitter.on('foo6', b)
// emitter.removeListener('foo6', a)
// emitter.removeListener('foo6', b)

// 05 node.js events > eventemitter class > error event
// emitter.emit('error', new Error('Something suspicious happened'))

// console.log('This line never executes')

// 05 node.js events > creating your own event emitters
function Foo() {
    eventEmitter.call(this)
}

Foo.prototype = eventEmitter.prototype

Foo.prototype.connect = function() {
    this.emit('connected')
}

foo = new Foo()
foo.on('connected', function() {
    console.log('connected raised!')
})
// foo.connect()

// 05 node.js events > process events
/*
process.on('uncaughtException', function(err) {
	console.log(`Caught exception: ${err}`)
	console.log(`Stack: ${err.stack}`)
	process.exit(1)
})
*/

// executeSomeFunction()
// console.log('This line will not run.')

// 05 node.js events > process events > exit
/*
process.on('exit', function(code) {
	console.log(`Exiting with code: ${code}`)
})
*/

// process.exit(1)

// 05 node.js events > process events > signals
/*
setTimeout(function() {
	console.log('5 seconds passed. Exiting.')
}, 5000)
*/
// console.log('Started. Will exit in 5 seconds.')

process.on('SIGINT', function() {
    console.log('Got SIGINT. Ignoring.')
})

// 05 streams > pipe
let fs = require('fs')
let readableStream = fs.createReadStream('./cool.txt')

// readableStream.pipe(process.stdout)

let gzip = require('zlib').createGzip()
let writableStream

// writableStream = fs.createWriteStream('./cool.txt.gz')
// readableStream.pipe(gzip).pipe(writableStream)

// 05 streams > consuming readable streams
/*
process.stdin.on('readable', function() {
	let buff = process.stdin.read()
	
	if (null != buff) {
		console.log('Input:')
		process.stdout.write(buff.toString())
	} else {
		console.log('Read complete!')
	}
})
*/

// 05 streams > writing to writable streams
// writableStream = fs.createWriteStream('message.txt')
// writableStream.write('foo bar ')
// writableStream.end('bas')

// 05 streams > creating your own stream > creating a readable stream
let readable = require('stream').Readable

function Counter() {
    readable.call(this)
    this._max = 1000
    this._index = 1
}

Counter.prototype = readable.prototype

Counter.prototype._read = function() {
    let i = this._index++

    if (this._max < i) {
        this.push(null)
    } else {
        let str = ' ' + i

        this.push(str)
    }
}

let counter = new Counter()

// counter.pipe(process.stdout)
// writableStream = fs.createWriteStream('output.txt')
// counter.pipe(writableStream)

// 05 streams > creating your own stream > creating a writable stream
let writable = require('stream').Writable

function Logger() {
    writable.call(this)
}

Logger.prototype = writable.prototype

Logger.prototype._write = function(chunk) {
    console.log(chunk.toString())
}

let logger = new Logger()

// readableStream.pipe(logger)
