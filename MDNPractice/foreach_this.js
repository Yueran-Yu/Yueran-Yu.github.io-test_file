// using map to reformat objects in an array
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

console.log(`reformatedArray: ${reformatedArray[0]["1"]}`);
reformatedArray.forEach((k, v) => { console.log(k, v) });

//no operation for uninitializtized values(sparse arrays)
const arraySparse = [1, 3, , 7]
let numCallbackRuns = 0

arraySparse.forEach(element => {

    console.log(element);
    numCallbackRuns++;
});
console.log("numCallbackRuns: ", numCallbackRuns);

// converting a for loop to forEach
const items = ['item1', 'item2', 'item3']
const copyItems = []

// before
// for (let i = 0; i < items.length; i++) {
//     copyItems.push(items[i])
// }
// console.log(`copyItems1: ${copyItems}`);

// after
items.forEach(item => { copyItems.push(item) });
console.log(`copyItems2: ${copyItems}`);

// printing the contents of an array
function logArrayElements(element, index, array) {
    console.log('a[' + index + '] = ' + element);
}

[2, 3, , 6].forEach(logArrayElements);
// prints a formatted version of the array
[2, 3, , 6].forEach(e => console.table(e));


//using thisArg

// this is a constructor
function Counter() {
    this.sum = 0;
    this.count = 0;
}

Counter.prototype.add = function(array) {
    // if passing the callback function uses an arrow function expression,
    // the thisArg parameter can be omitted, since all arrow functions
    // lexically bind the this value.
    array.forEach(entry => {
        this.sum += entry;
        ++this.count;
    }, this);
};

const obj = new Counter();
obj.add([2, 3, 4]);
console.log(obj);
console.log(`obj.count: ${obj.count}`);
console.log(`obj.sum: ${obj.sum}`);

// forEach doesn't make a copy of the array before iterating.
let words = ['one', 'two', 'three', 'four']
words.forEach(word => {
    console.log(word);
    if (word === 'two') {
        words.shift();
    }
});

console.log(words);