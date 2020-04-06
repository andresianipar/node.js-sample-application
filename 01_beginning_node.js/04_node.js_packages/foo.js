// 04 revisiting node modules > folder-based modules
let bar = require('./bar')

console.log('bar1 was called' === bar.bar1())
console.log('bar2 was called' === bar.bar2())
