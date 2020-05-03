// const fs = require('fs');

const f1 = function f1() {
  // const cache = {};

  // function inconsistentRead(fruitName, callback) {
  //   if (cache.fruitName) {
  //     // invoked synchronously
  //     callback(cache);
  //   } else {
  //     // asynchronous function
  //     setTimeout(
  //       () => {
  //         cache.fruitName = fruitName;
  //         callback(cache);
  //       },
  //       1000,
  //     );
  //   }
  // }

  // inconsistentRead('banana', (data) => {
  //   console.log(data);
  // });

  // inconsistentRead('banana', (data) => {
  //   console.log(data);
  // });
};

const f2 = function f2() {
  // const cache = {};

  // function inconsistentRead(fileName, callback) {
  //   if (cache.fileName) {
  //     // invoked synchronously
  //     callback(cache.fileName);
  //   } else {
  //     // asynchronous function
  //     fs.readFile(fileName, 'utf8', (err, data) => {
  //       if (!err) {
  //         cache.fileName = data;
  //         callback(data);
  //       } else {
  //         console.log(err);
  //       }
  //     });
  //   }
  // }

  // function createFileReader(fileName) {
  //   const listeners = [];

  //   inconsistentRead(fileName, (value) => listeners.forEach((listener) => {
  //     listener(value);
  //   }));

  //   return {
  //     onDataReady: (listener) => listeners.push(listener),
  //   };
  // }

  // const reader1 = createFileReader('/etc/hosts');

  // reader1.onDataReady((data1) => {
  //   console.log('First call data:');
  //   console.log(data1);

  //   const reader2 = createFileReader('/etc/hosts');

  //   reader2.onDataReady((data2) => {
  //     console.log('Second call data:');
  //     console.log(data2);
  //   });
  // });
};

const f3 = function f3() {
  // const cache = {};

  // function consistentReadSync(fileName) {
  //   if (!cache.fileName) {
  //     cache.fileName = fs.readFileSync(fileName, 'utf8');
  //   }

  //   return cache.fileName;
  // }

  // function createFileReader(fileName, callback) {
  //   const value = consistentReadSync(fileName);

  //   return callback(value);
  // }

  // const reader1 = createFileReader('/etc/hosts', (data1) => `First call data:\n${data1}`);

  // console.log(reader1);

  // const reader2 = createFileReader('/etc/hosts', (data2) => `Second call data:\n${data2}`);

  // console.log(reader2);
};

const f4 = function f4() {
  // const cache = {};

  // function consistentReadAsync(fileName, callback) {
  //   if (cache.fileName) {
  //     process.nextTick(() => callback(cache.fileName));
  //   } else {
  //     // asynchronous function
  //     fs.readFile(fileName, 'utf8', (err, data) => {
  //       cache.fileName = data;
  //       callback(data);
  //     });
  //   }
  // }

  // consistentReadAsync('/etc/hosts', (data) => {
  //   console.log('First call data:');
  //   console.log(data);
  // });

  // consistentReadAsync('/etc/hosts', (data) => {
  //   console.log('Second call data:');
  //   console.log(data);
  // });
};

const f5 = function f5() {
  // const cache = {};

  // function consistentReadAsync(fileName, callback) {
  //   if (cache.fileName) {
  //     process.nextTick(() => callback(cache.fileName));
  //   } else {
  //     // asynchronous function
  //     fs.readFile(fileName, 'utf8', (err, data) => {
  //       // propagate the error and exit the current function
  //       if (err) {
  //         return callback(err);
  //       }

  //       cache.fileName = data;

  //       // no errors, propagate just the data
  //       return callback(null, data);
  //     });
  //   }
  // }

  // consistentReadAsync('/etc/host', (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('First call data:');
  //     console.log(data);
  //   }
  // });

  // consistentReadAsync('/etc/hosts', (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('Second call data:');
  //     console.log(data);
  //   }
  // });
};

const f6 = function f6() {
  // const cache = {};

  // function consistentReadAsync(jsonFileName, callback) {
  //   if (cache.jsonFileName) {
  //     process.nextTick(() => callback(cache.jsonFileName));
  //   } else {
  //     // asynchronous function
  //     fs.readFile(jsonFileName, 'utf8', (err, data) => {
  //       // propagate the error and exit the current function
  //       if (err) {
  //         return callback(err);
  //       }

  //       cache.jsonFileName = JSON.parse(data);

  //       // no errors, propagate just the data
  //       return callback(null, cache.jsonFileName);
  //     });
  //   }
  // }

  // try {
  //   consistentReadAsync('/etc/hosts', (err, data) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log('First call data:');
  //       console.log(data);
  //     }
  //   });
  // } catch (err) {
  //   console.log(`err: ${err}`);
  // }

  // try {
  //   consistentReadAsync('/etc/hosts', (err, data) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log('Second call data:');
  //       console.log(data);
  //     }
  //   });
  // } catch (err) {
  //   console.log(`err: ${err}`);
  // }

  // process.on('uncaughtException', (err) => {
  //   console.log(`Uncaught exception: ${err}`);

  //   // Terminates the application with 1 (error) as exit code:
  //   // without the following line, the application would continue
  //   process.exit(1);
  // });
};

module.exports = {
  f1,
  f2,
  f3,
  f4,
  f5,
  f6,
};
