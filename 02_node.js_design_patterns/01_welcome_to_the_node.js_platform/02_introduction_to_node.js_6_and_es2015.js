const f2 = function f2() {
  function DelayedGreeter(name) {
    this.name = name;
  }

  DelayedGreeter.prototype.greet = function greet() {
    setTimeout(() => {
      // console.log(`Hello ${this.name}`);
    }, 500);
  };

  const greeter = new DelayedGreeter('World');

  return greeter.greet();
};

const f3 = function f3() {
  function Person(name, surname, age) {
    this.name = name;
    this.surname = surname;
    this.age = age;
  }

  Person.prototype.getFullName = function getFullName() {
    return `${this.name} ${this.surname}`;
  };

  Person.older = function older(person1, person2) {
    return person1.age >= person2.age ? person1 : person2;
  };

  const bob = new Person('Bob', 'the Builder', 10);
  const rudy = new Person('Rudy', 'Tabuti', 13);
  const bobFullName = bob.getFullName();
  const oldest = Person.older(bob, rudy);

  // console.log(bobFullName);
  // console.log(oldest);

  return {
    bobFullName,
    oldest,
  };
};

const f4 = function f4() {
  class Person {
    constructor(name, surname, age) {
      this.name = name;
      this.surname = surname;
      this.age = age;
    }

    getFullName() {
      return `${this.name} ${this.surname}`;
    }

    static older(person1, person2) {
      return person1.age >= person2.age ? person1 : person2;
    }
  }

  const bob = new Person('Bob', 'the Builder', 10);
  const rudy = new Person('Rudy', 'Tabuti', 13);
  const bobFullName = bob.getFullName();
  const oldest = Person.older(bob, rudy);

  // console.log(bobFullName);
  // console.log(oldest);

  return {
    bobFullName,
    oldest,
  };
};

const f5 = function f5() {
  const person = {
    name: 'George',
    surname: 'Washington',

    get fullName() {
      return `${this.name} ${this.surname}`;
    },

    set fullName(fullName) {
      const [name, surname] = fullName.split(' ');

      this.name = name;
      this.surname = surname;
    },
  };

  // console.log(person.fullName);

  person.fullName = 'Alan Turing';

  // console.log(person.fullName);

  return person.fullName;
};

const f6 = function f6() {
  const profiles = new Map();

  profiles.set('twitter', '@lordvoldemort');
  profiles.set('facebook', 'lordvoldemort');
  profiles.set('reddit', 'lordvoldemort666');

  // profiles.forEach((value, key) => {
  //   console.log(`profiles[${key}] = ${value}`);
  // });

  profiles.delete('facebook');

  return profiles;
};

const f7 = function f7() {
  const tests = new Map();

  tests.set(() => 2 + 2, 4);
  tests.set(() => 2 * 2, 4);
  tests.set(() => 2 / 2, 1);

  // tests.forEach((value, key) => {
  //   console.log(`profiles[${key}] = ${value}`);
  //   console.log(`${key()} = ${value}`);
  // });

  return tests;
};

const f8 = function f8() {
  const s = new Set([1, 2, 3, 4, 5]);

  s.add(5);

  // s.forEach((value, key) => {
  //   console.log(`s[${key}] = ${value}`);
  // });

  // console.log('\n');

  s.delete(1);

  // s.forEach((value, key) => {
  //   console.log(`s[${key}] = ${value}`);
  // });

  return s;
};

const f9 = function f9() {
  let obj = {};
  const map = new WeakMap();

  map.set(obj, { key: 'some_value' });

  // console.log(map.get(obj));

  obj = undefined;

  // console.log(map.get(obj));

  return map;
};

const f10 = function f10() {
  let obj1 = { key: 'val1' };
  const obj2 = { key: 'val2' };
  const set = new WeakSet([obj1, obj2]);

  // console.log(set.has(obj1));
  // console.log(set.has(obj2));

  obj1 = undefined;

  // console.log(set.has(obj1));
  // console.log(set.has(obj2));

  return {
    obj1,
    obj2,
    set,
  };
};

module.exports = {
  f2,
  f3,
  f4,
  f5,
  f6,
  f7,
  f8,
  f9,
  f10,
};
