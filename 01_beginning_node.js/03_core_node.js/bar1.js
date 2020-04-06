// 03 node.js file-based module system > node.js require function > shared state
let foo = require('./foo1')

console.log('In bar file:', foo.something)
