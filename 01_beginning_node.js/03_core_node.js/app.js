// 03 reusing node.js code in the browser > setting up requirejs
// console.log('Hello, World!')

// 03 reusing node.js code in the browser > playing with amd
define(['./foo3', './bar2'], function(foo, bar) {
    foo()
    bar()
    // bar.log()
})
