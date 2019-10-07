// 03 node.js file-based module system > node.js exports > exports alias
let a = function() {
    console.log('a called')
}

let b = function() {
    console.log('b called')
}

module.exports = {
    a: a,
    b: b
}

exports.a = function() {
    console.log('a called')
}

exports.b = function() {
    console.log('b called')
}
