// 10 the callback hell
function _1(callback, data) {
	console.log('Executing 1');
	setTimeout(callback, 1000, data);
}

function _2(callback, data) {
	console.log('Executing 2');
	setTimeout(callback, 1000, data);
}

function _3(callback, data) {
	console.log('Executing 3');
	setTimeout(callback, 1000, data);
}

// _1((text1) => {
// 	_2((text2) => {
// 		_3((text3) => {
// 			console.log('Done: data' === `Done: ${text3}`);
// 		}, text2);
// 	}, text1);
// }, 'data');

function handle_3(text3) {
	console.log('Done: data' === `Done: ${text3}`);
}

function handle_2(text2) {
	_3(handle_3, text2);
}

function handle_1(text1) {
	_2(handle_2, text1);
}

// _1(handle_1, 'data');

// 10 the callback hell > if/else in an async world
function maybeSync(arg, callback) {
	if (arg) {
		callback('Cached data');
	} else {
		setTimeout(() => {
			callback('Loaded data');
		}, 5000);
	}
}

function foo() {
	console.log('foo');
}


function bar() {
	console.log('bar');
}

// maybeSync(true, (data) => {
// 	foo();
// });
// bar();

function alwaysSync(arg, callback) {
	if (arg) {
		process.nextTick(() => {
			callback('Cached data');
		});
	} else {
		setTimeout(() => {
			callback('Loaded data');
		}, 500);
	}
}

// alwaysSync(true, (data) => {
// 	foo();
// });
// bar();

// 10 the callback hell > loops in an async world
function loadItem(id, callback) {
	setTimeout(() => {
		callback(null, { id: id });
	}, 500);
}

let loadedItems = [];

function itemsLoaded() {
	return `Do something with: ${JSON.stringify(loadedItems)}`;
}

function itemLoaded(err, item) {
	loadedItems.push(item);
	if (2 === loadedItems.length) {
		console.log(itemsLoaded());
	}
}

// loadItem(1, itemLoaded);
// loadItem(2, itemLoaded);

let async = require('async');

loadedItems = [];

// async.parallel([
// 	(callback) => {
// 		loadItem(1, callback);
// 	},
// 	(callback) => {
// 		loadItem(2, callback);
// 	}
// ], (err, loadedItems) => {
// 	if (err) {
// 		console.log(err);
// 	}

// 	console.log(`Do something with: ${JSON.stringify(loadedItems)}`);
// });

// 10 the callback hell > error handling
let fs = require('fs');

function loadJSONSync(filename) {
	return JSON.parse(fs.readFileSync(filename));
}

// console.log(loadJSONSync('good.json'));

// non-existent json file
try {
	// console.log(loadJSONSync('absent.json'));
} catch (e) {
	console.log(e.message);
}

// invalid json file
try {
	// console.log(loadJSONSync('bad.json'));
} catch (e) {
	console.log(e.message);
}

let loadJSONAsync = (filename, callback) => {
	fs.readFile(filename, (err, data) => {
		if (err) {
			callback(err);
		} else {
			callback(null, JSON.parse(data));
		}
	});
};

// loadJSONAsync('bad.json', (err, data) => {
// 	if (err) {
// 		console.log(err.message);
// 	} else {
// 		console.log(data);
// 	}
// });

loadJSONAsync = (filename, callback) => {
	fs.readFile(filename, (err, data) => {
		if (err) {
			callback(err);
		} else {
			try {
				callback(null, JSON.parse(data));
			} catch (e) {
				callback(e);
			}
		}
	});
};

// loadJSONAsync('bad.json', (err, data) => {
// 	if (err) {
// 		console.log(err.message);
// 	} else {
// 		console.log(data);
// 	}
// });

// loadJSONAsync('good.json', (err, data) => {
// 	console.log('Callback called');

// 	if (err) {
// 		console.log(err.message);
// 	} else {
// 		let foo;

// 		console.log(foo.bar);
// 	}
// });

loadJSONAsync = (filename, callback) => {
	fs.readFile(filename, (err, data) => {
		let parsed;

		if (err) {
			return callback(err);
		} else {
			try {
				parsed = JSON.parse(data);
			} catch (e) {
				return callback(e);
			}
		}

		return callback(null, parsed);
	});
};

// loadJSONAsync('bad.json', (err, data) => {
// 	console.log('Callback called');

// 	if (err) {
// 		console.log(err.message);
// 	} else {
// 		console.log(data);
// 	}
// });

// loadJSONAsync('good.json', (err, data) => {
// 	console.log('Callback called');

// 	if (err) {
// 		console.log(err.message);
// 	} else {
// 		console.log(data);
// 	}
// });

// 10 introduction to promises > create a promise
const q = require('q');
const deferred = q.defer();
const promise = deferred.promise;

promise.then((val) => {
	console.log(`Done with: ${val}`);
});

// deferred.resolve('Final value');
