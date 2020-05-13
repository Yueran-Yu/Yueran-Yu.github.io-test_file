function multiply(a, b = 1) {
    return a * b;
}
console.log(`multiply(5,2): ${multiply(5,2)}`);
console.log(`multiply(5): ${multiply(5)}`);

// the default paramaters even applies to functions and variables
function callSomething(thing = something()) {
    return thing;
}

let numberOfTimesCalled = 0;

function something() {
    numberOfTimesCalled += 1;
    return numberOfTimesCalled;
}

console.log(callSomething());
console.log(callSomething());

// earlier parameters are available to later default parameters
function greet(name, greeting, message = greeting + ' ' + name) {
    return [name, greeting, message];
}
console.log(greet('David', 'Hi'));
console.log(greet('David', 'Hi', 'Hello world!'));

//rest parameter
function sum(...theArgs) {
    return theArgs.reduce((previous, current) => { return previous + current; });
}

console.log(sum(1, 2, 3));
console.log(sum(1, 2, 3, 4));