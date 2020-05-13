const array1 = [1, 4, 9, 16];
const map1 = array1.map(x => x * 2);
console.log(map1);

//mapping an array of numbers to an array of square roots
let numbers = [1, 4, 9]
let roots = numbers.map(num => Math.sqrt(num))
console.log(`roots: ${roots}`);


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

// mapping an array of nubmers using a function containing an argument
let nubmers1 = [1, 4, 9]
let doubles = nubmers1.map(num => num * 2);
console.log(`doubles: ${doubles}`);

//using map generically
let map = Array.prototype.map
let a = map.call('Hello World', x => x.charCodeAt(0));
console.log(a);

//mapped array contains undefined
let numbers2 = [1, 2, 3, 4]
let filteredNumbers = numbers2.map((num, index) => { if (index < 3) return num })
console.log(`filteredNumbers: ${filteredNumbers}`);