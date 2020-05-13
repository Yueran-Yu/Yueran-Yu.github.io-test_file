/*loop iterating over iterable objects, including
String, Array, arguments, NodeList, TypedArray, Map, Set */

const array1 = ['a', 'b', 'c'];

for (const element of array1) {
    console.log(element);
}

//iterating over a typedarray
const iterable = new Uint8Array([0x00, 0xff]);
for (const value of iterable) {
    console.log(value);
}

let kvArray = [
    { key: 1, value: 10 },
    { key: 2, value: 20 },
    { key: 3, value: 30 }
]

let reformatedArray = kvArray.map(obj => {
    let rObj = {}
    rObj[obj.key] = obj.value
    return rObj
});

// this is not iterable
// for(const [key, value] of reformatedArray)
// {
//   console.log(key);
// }

console.log(`reformatedArray: ${reformatedArray[0]["1"]}`);
reformatedArray.forEach((k, v) => { console.log(k, v) });


//iterating over the arguments object
(function() {
    for (const argument of arguments) {
        console.log(argument);
    }
})(1, 2, 4);


// itrating over a DOM collection
const articleParagraphs = document.querySelectorAll('article > ol');
for (const para of articleParagraphs) {
    para.classList.add('read');
}

// the difference between for...of and for...in
Object.prototype.objCustom = function() {};
Array.prototype.arrCustom = function() {};
const iterable1 = [3, 5, 7];
iterable1.foo = 'hello';
for (const i in iterable1) {
    console.log(i);
}
for (const i in iterable1) {
    if (iterable1.hasOwnProperty(i)) {
        console.log(i);
    }
}
for (const i of iterable1) {
    console.log(i);
}

// const mapper = new Map([1, 2], [2, 4], [4, 8]);
// Array.from(mapper);

const mapper = new Map([
    ['1', 'a'],
    ['2', 'b']
]);

console.log(`Array.from(mapper.values()): ${Array.from(mapper.values())}`);
console.log(`Array.from(mapper.keys()): ${Array.from(mapper.keys())}`);

// array from an array-like object(arguments)
function f() {
    return Array.from(arguments);
}
f(1, 2, 3);

// using arrow functions and Array.from()
let c = Array.from([1, 2, 3], x => x + x);
console.log(c);

// sequence generator function (commonly referred to as "range",
// e.g. clojure, PHP etc)

const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));

range(0, 4, 1);
range(1, 10, 2);