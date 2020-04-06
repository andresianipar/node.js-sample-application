// 03 reusing node.js code in the browser > playing with amd
define(['exports'], function(exports) {
    let bar = exports.log = function() {
        console.log('bar was called')
    }

    return bar
})
