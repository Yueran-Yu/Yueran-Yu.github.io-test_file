'use strict';
const materials = [
    'Hydrogen',
    'Helium',
    'Lithium',
    'Beryllium'
];

// when there is only parameter, we can remove the surrounding parntheses
// when the only statement in an arrow function is `return`, we can remove 'return' and the surrounding curly brackets
console.log(materials.map(material => material.length));

function Person() {
    // this person() constructor defines `this` as an instance of itself
    this.age = 0;
    // in non-strict mode, the growUp() function defines `this`
    // as the global object (because it's where growUp() is executed.),
    // which is different from the `this`
    // defined by the Person() constructor
    setInterval(() => { this.age++; }, 1000);
}
var p = new Person();
console.log(new Person());

// consise body syntax, implied "return"
var func = x => x * x;
//with block body, explicit "return" needed
var func1 = (x, y) => { return x + y };

let c = (() => 'foobar')();
console.log(`${c}`);

let simple = a => a > 15 ? 15 : a;
console.log(`simple(12): ${simple(12)}`);
console.log(`simple(10): ${simple(30)}`);

let arr = [5, 6, 13, 0, 1, 18, 23];
let sum = arr.reduce((a, b) => a + b);
console.log(`sum : ${sum}`);
let even = arr.filter(v => v % 2 == 0);
console.log(`even : ${even}`);
let double1 = arr.map(d => d * 2);
console.log(`double : ${double1}`);

var total = values.reduce((a, b) => a + b, 0);


// always wrap the object in parentheses;
// create a new empty object for each puppy to play with
var chewToys = puppies.map(puppy => {}); // BUG
var chewToys = puppies.map(puppy => ({})); // BUG
// this is because  an empty object{} and empty block{} look exactly the same
// in ES6 is that { immediately following an arrow is always treated as the start
// of a block, never the start of an object.
// so wrapping object literals in parentheses is the only trick you need to remember.

// arrow function do not have their own this value