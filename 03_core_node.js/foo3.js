// 03 reusing node.js code in the browser > playing with amd
define([], function() {
    let foo = function() {
        console.log('foo was called')
    }

    return foo
})
