const { EventEmitter } = require('events');
const fs = require('fs');
// const glob = require('glob');

const f1 = function f1() {
  function findPattern(files, regex) {
    const emitter = new EventEmitter();

    files.forEach((file) => {
      fs.readFile(file, 'utf8', (err, content) => {
        if (err) {
          return emitter.emit('error', err);
        }

        emitter.emit('fileread', file);

        let match;

        if (content.match(regex)) {
          match = content.match(regex);
          match.forEach((elem) => emitter.emit('found', file, elem));
        }

        return emitter.emit('done');
      });
    });

    return emitter;
  }

  findPattern(['/etc/hosts'], /(?:localhost)/);
  // .on('error', (err) => console.log(`Error emitted: ${err.message}`))
  // .on('fileread', (file) => console.log(`${file} file was read`))
  // .on('found', (file, match) => console.log(`Matched ${match} in file ${file}`))
  // .on('done', () => console.log('Finished reading the files'));
};

const f2 = function f2() {
  class FindPattern extends EventEmitter {
    constructor(regex) {
      super();
      this.regex = regex;
      this.files = [];
    }

    addFile(file) {
      this.files.push(file);

      return this;
    }

    find() {
      this.files.forEach((file) => {
        fs.readFile(file, 'utf8', (err, content) => {
          if (err) {
            return this.emit('error', err);
          }

          this.emit('fileread', file);

          let match = null;

          if (content.match(this.regex)) {
            match = content.match(this.regex);

            match.forEach((elem) => this.emit('found', file, elem));
          }

          return this.emit('done');
        });
      });

      return this;
    }
  }

  const findPatternObject1 = new FindPattern(/(?:localhost)/);

  findPatternObject1
    .addFile('/etc/hosts')
    .find();
  // .on('error', (err) => console.log(`Error emitted: ${err.message}`))
  // .on('fileread', (file) => console.log(`${file} file was read`))
  // .on('found', (file, match) => console.log(`Matched ${match} in file ${file}`))
  // .on('done', () => console.log('Finished reading the files'))
  // .on('done', () => console.log('Finished reading the files'))
  // .on('done', () => console.log('Finished reading the files'))
  // .on('done', () => console.log('Finished reading the files'))
  // .on('done', () => console.log('Finished reading the files'));

  // const findPatternObject2 = findPatternObject1;

  // findPatternObject2
  //   .on('error', (err) => console.log(`Error emitted: ${err.message}`))
  //   .on('fileread', (file) => console.log(`${file} file was read`))
  //   .on('found', (file, match) => console.log(`Matched ${match} in file ${file}`))
  //   .on('done', () => console.log('Finished reading the files'));
};

const f3 = function f3() {
  // const globEvent = glob('*.json', (err, files) => {
  //   console.log(`All files found: ${JSON.stringify(files)}`);
  // });

  // globEvent.on('match', (match) => console.log(`Match found: ${match}`));
};

module.exports = {
  f1,
  f2,
  f3,
};
