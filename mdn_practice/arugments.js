'use strict';

function func1(a, b, c) {
    console.log(arguments[0]);
    console.log(arguments[1]);
    console.log(arguments[2]);
}

func1(1, 2, 4);

function longestString() {
    let longest = '';
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i].length > longest.length) {
            longest = arguments[i];
        }
    }
    console.log(`length: ${arguments.length}`);
    return longest;
}

console.log(`${longestString('qdwr','refffrfss') }`);

// defining a function that concatenates several strings
function myContact(separator) {
    let args = Array.prototype.slice.call(arguments, 1)
    return args.join(separator);
}

console.log(myContact('# ', 'red', 'orange', 'blue', 'pink'));

//defining a function that creates HTML lists
function list(type) {
    let html = '<' + type + 'l><li>';
    let args = Array.prototype.slice.call(arguments, 1);
    html += args.join('</li><li>');
    html += '</li></' + type + 'l>'; // end list
    return html;
}

let listHTML = list('u', 'one', 'two', 'three');
console.log(listHTML);

// passed simple parameters
function func2(a) {
    arguments[0] = 99;
    console.log(`func2-a: ${a}`);
}

function func3(a) {
    a = 99;
    console.log(`func3-{arguments[0]}: ${arguments[0]}`);
}
func2(23);
func3(10);


// passed rest, default, or destructured parameters
function func4(a = 55) {
    arguments[0] = 99;
    console.log(`func4-(default a = 55): ${a}`);
}
func4(13);

function func5(a = 55) {
    console.log(`func5-(default a = 55) print arguments[0]: ${arguments[0]}`);
}
func5();

function f() {
    return 1;
}

{
    function f() {
        return 2;
    }
}
console.log(f() === 1); //under strict: true
console.log(f() === 2); // under strict: false

// this function returns a string padded with leading zeros
function padZeros(num, totalLen) {
    let numStr = num.toString(); // initialize return value as string
    let numZeros = totalLen - numStr.length; // calculate no. of zero.
    for (let i = 0; i < numZeros; i++) {
        numStr = "0" + numStr;
    }
    return numStr;
}
let r1 = padZeros(43, 3);
let r2 = padZeros(323, 5);
console.log(r1);
console.log(r2);

if ('function' === typeof window.padZeros) {
    console.log('This is a function');
} else {
    console.log('Not a function');

}