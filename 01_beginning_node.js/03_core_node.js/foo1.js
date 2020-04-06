// 03 node.js file-based module system
module.exports = function() {
    console.log('A function in file foo')
}

// 03 node.js file-based module system > node.js require function
module.exports = {
    something: 123
}

// 03 node.js file-based module system > node.js require function > object factories
module.exports = function() {
    return {
        something: 321
    }
}
