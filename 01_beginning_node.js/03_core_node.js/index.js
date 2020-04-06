// 03 node.js file-based module system
// let foo = require('./foo1')

// foo()

// 03 node.js file-based module system > node.js require function
let t1 = new Date().getTime()
// let foo1 = require('./foo1')

// console.log(new Date().getTime() - t1)

let t2 = new Date().getTime()
// let foo2 = require('./foo1')

// console.log(new Date().getTime() - t2)

// 03 node.js file-based module system > node.js require function > shared state
// let foo = require('./foo1')

// console.log('Initial something:', foo.something)
// foo.something = 456

// let bar = require('./bar1')

// 03 node.js file-based module system > node.js require function > object factories
// let foo = require('./foo1')
// let obj = foo()

// console.log(obj.something)
// console.log(require('./foo1')())

// 03 node.js file-based module system > node.js exports > exports alias
// let foo = require('./foo2')
// let a = foo.a
// let b = foo.b

// a()
// b()

// let foo1 = require('./foo2')

// foo1.a()
// foo1.b()

// let foo2 = require('./foo2')

// foo2.a()
// foo2.b()

// let foo3 = require('./foo2')

// foo3.a()
// foo3.b()

// 03 important globals > timers
let count = 0
let intervalObject = setInterval(function() {
    count++
    // console.log(count, 'seconds passed')
    if (5 == count) {
        // console.log('exiting')
        clearInterval(intervalObject)
    }
}, 0)

// 03 important globals > __filename and __dirname
// console.log(__dirname)
// console.log(__filename)

// 03 important globals > process > command line arguments

// 03 important globals > process > process.nextTick
process.nextTick(function() {
    // console.log('Next tick')
})
// console.log('Immediate')

// 03 important globals > buffer
let str = 'Hello, World!'
let buffer = Buffer.from(str, 'UTF-8')

// console.log(buffer)

let roundTrip = buffer.toString('UTF-8')

// console.log(roundTrip)

// 03 important globals > global
global.something = 123

// console.log(global.console === console)
// console.log(global.setTimeout === setTimeout)
// console.log(global.process === process)
// console.log(123 === something)

// 03 core modules > path module > path.normalize(str)
let path = require('path')

// console.log(path.normalize('/foo/bar/...'))
// console.log(path.normalize('/foo//bar//...'))

// 03 core modules > path module > path.join([str1], [str2], ...)
// console.log(path.join('foo', '/bar', 'bas'))

// 03 core modules > path module > dirname, basename, and extname
let completePath = '/foo/bar/bas.html'

// console.log('/foo/bar' === path.dirname(completePath))
// console.log('bas.html' === path.basename(completePath))
// console.log('.html' === path.extname(completePath))

// 03 core modules > fs module
let fs = require('fs')

try {
    // fs.writeFileSync('test.txt', 'Hello, World!')
    // console.log('Hello, World!' === fs.readFileSync('test.txt').toString())
    // fs.unlinkSync('./test.txt')
    // console.log('test.txt successfully deleted')
} catch (e) {
    console.log(e)
}

// fs.writeFile('test.txt', 'Hello, World!')
// console.log('Hello, World!' === fs.readFile('test.txt').toString())
/*
fs.unlink('./test.txt', function(e) {
	if (e) {
		console.log(e)
	} else {
		console.log('test.txt successfully deleted')
	}
})
*/

// 03 core modules > os module
let os = require('os')
let gigabyte = Math.pow(1024, 3)

// console.log(16 === Math.round(os.totalmem() / gigabyte))
// console.log(16 >= Math.round(os.freemem() / gigabyte))
// console.log('Percent consumed is', Math.round(100 - (os.freemem() / os.totalmem() * 100)), 'percent')
// console.log(8 === os.cpus().length)

// 03 core modules > util module
let util = require('util')

// util.log('Hello, World!')

let name = 'Nate'
let money = 33

// console.log('Nate has 33 dollars' === util.format('%s has %d dollars', name, money))
// console.log(util.isArray([]))
// console.log(util.isArray({ length: 0 }))
// console.log(util.isDate(new Date()))
// console.log(util.isDate({}))
// console.log(util.isError(new Error('This is an error')))
// console.log(util.isError({ message: 'I have a message' }))

// 03 reusing node.js code in the browser > setting up requirejs
// 03 reusing node.js code in the browser > playing with amd
