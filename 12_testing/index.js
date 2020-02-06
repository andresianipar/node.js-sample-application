function _1(flag) {
    debugger;

    if (flag) {
        return 10;
    } else {
        return 20;
    }
}

function _2(callback) {
    setTimeout(() => {
        callback(new Error('This async task will fail'));
    }, 1000);
}

(function () { }());

// 12 testing > mocha
exports._1 = _1;
// 12 testing > mocha > async testing
exports._2 = _2;
