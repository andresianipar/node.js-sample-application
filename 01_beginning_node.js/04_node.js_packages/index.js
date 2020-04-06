// 04 json > loading json in node.js
let config = require('./config')

// console.log('This is the value for foo' === config.foo)

// 04 json > the json global
let foo = {
    a: 1,
    b: 'a string',
    c: true
}

let json = JSON.stringify(foo)

// console.log('{"a":1,"b":"a string","c":true}' === json)
// console.log(String.prototype === Object.getPrototypeOf(json))

let backToJS = JSON.parse(json)

// console.log(foo.a === backToJS.a)
// console.log(foo.b === backToJS.b)
// console.log(foo.c === backToJS.c)

// 04 npm > installing an npm package
let _ = require('underscore')

// console.log(1 === _.min([3, 1, 2]))

// 04 popular node.js packages > underscore
foo = [1, 10, 50, 200, 900, 90, 40]

let filter1 = foo.filter(item => 100 < item)
let filter2 = _.filter(foo, item => 100 < item)
let map1 = foo.map(item => item * 2)
let map2 = _.map(foo, item => item * 2)

// console.log(200 === filter1[0] && 900 === filter2[1])
// console.log(200 === filter1[0] && 900 === filter2[1])
// console.log(JSON.stringify(filter1) === JSON.stringify(filter2))
// console.log(JSON.stringify(map1) === JSON.stringify(map2))
// console.log(1 === _.reject(foo, item => item % 2 === 0)[0])
// console.log(900 === _.max(foo))
// console.log(1 === _.min(foo))

// 04 popular node.js packages > handling command line arguments
let argv = require('optimist').argv

// console.log(argv)
delete argv['$0']
// console.log(argv)

// 04 popular node.js packages > handling date/time using moment
let moment = require('moment')

// console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
// console.log(moment('31-12-2019', 'DD-MM-YYYY').toDate())

// 04 popular node.js packages > handling date/time using moment > serializing dates
let date = new Date(Date.UTC(2019, 0, 1))

// 2019-01-01T00:00:00.000Z
// console.log(Date.prototype === Object.getPrototypeOf(date))

let jsonString = date.toJSON()

// 2019-01-01T00:00:00.000Z
// console.log(String.prototype === Object.getPrototypeOf(jsonString))
// 2019-01-01T00:00:00.000Z
// console.log(Date.prototype === Object.getPrototypeOf(new Date(jsonString)))

foo = {}

let bar = {
    'foo': foo
}

// console.log('{"foo":{}}' === JSON.stringify(bar))
foo.toJSON = function () {
    return 'custom'
}
// console.log('{"foo":"custom"}' === JSON.stringify(bar))

// 04 popular node.js packages > customizing console colors
require('colors')

// console.log('Hello, World!'.red)
// console.log('Hello, World!'.yellow)
// console.log('Hello, World!'.green)
// console.log('Hello, World!'.blue)
// console.log('Hello, World!'.magenta)
// console.log('Hello, World!'.rainbow)

// 04 popular node.js packages > customizing console colors > how does it work?
String.prototype.red = function (str) {
    let redCode = '\x1b[31m'
    let clearCode = '\x1b[39m'

    return redCode + this + clearCode
}

// console.log('Hello, World!'.red)
