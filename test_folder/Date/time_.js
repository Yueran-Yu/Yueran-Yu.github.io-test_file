// "use strict";

var dd = document.getElementById('time');
var t = new Date();
var tex = document.createTextNode(t);
dd.appendChild(tex);

// alert(parseInt("4F", 16));

function hasChecked() {
    var ck = document.getElementById('check');

    if (ck.checked == true) {
        alert("You have checked the box.");
    }
}

var cked = document.getElementById('check');
cked.addEventListener('click', hasChecked, false);

// (function() {
//     var a = b = 3;
// })();

// console.log("a defined? " + (typeof a !== 'undefined'));
// console.log("b defined? " + (typeof b !== 'undefined'));

var myObject = {
    foo: "bar",
    func: function() {
        var self = this;
        console.log("outer func: this.foo = " + this.foo);
        console.log("outer func: self.foo = " + self.foo);

        (function() {
            console.log("inner func: this.foo = " + this.foo);
            console.log("inner func: self.foo = " + self.foo);

        }());
    }
}

myObject.func();

function areTheNumbersAlmostEqual(num1, num2) {
    return Math.abs(num1 - num2) < Number.EPSILON;
}
console.log("Math absolute: " + areTheNumbersAlmostEqual(0.1 + 0.2, 0.3));

// (function() {
//     console.log(1);
//     setTimeout(function() { console.log(2) }, 1000);
//     setTimeout(function() { console.log(3) }, 0);
//     console.log(4);
// })();


function isPalindrome(str) {
    var afterStr = str.replace(/\W/g, '').toLowerCase().split('').reverse().join('');
    // return (str == afterStr);
    console.log("Check \"" + str + "\" is a palindrome or not: " + (str == afterStr));
}

isPalindrome('levelaw');
isPalindrome('level');
isPalindrome('A car, a man, a maraca');



function regexTest() {
    var str = "Give 100%!";
    var result = str.match(/\w/g);
    console.log(result);
}

// regexTest();

function sum(x) {
    if (arguments.length == 2) {
        return arguments[0] + arguments[1];
    } else {
        return function(y) { return x + y };
    }
}

console.log("Invoke sum() or sum()(): " + sum(2, 3)); // Outputs 5
console.log("Invoke sum() or sum()(): " + sum(2)(3)); // Outputs 5

function run() {
    var foo = "Foo";
    var bar = "Bar";
    console.log("outside socpe: " + foo, bar);

    {
        let baz = "Bazz";
        console.log("inside scope: " + baz);
    }
    // console.log(baz); // referenceError
}

run();

function differLetVar() {
    var funcs = [];
    // let's create 3 functions
    for (var i = 0; i < 3; i++) {
        // store them in funcs[i]
        funcs[i] = function() {
            // each should log its value
            console.log("(Test the \"let\" and \"var\" ) My value:" + i);
        };
    }
    for (var j = 0; j < 3; j++) {
        funcs[j]();
    }
}

differLetVar();


function go(n) {
    for (var n of n.a) {
        console.log(n);
    }
}

go({ a: [1, 2, 3] });
var exp = "hahahet";
// alert(`string txt ${exp} str srgh`);
console.log(`string text line 1
string text line 2`);

let a = 5;
let b = 10;
console.log(`Fifteen is ${a +b} and
not ${2 * a +b}`);


var buttons1 = function() {
    for (var i = 0; i < 5; i++) {
        var btn = document.createElement('button');
        btn.appendChild(document.createTextNode('#Button ' + i));
        btn.addEventListener('click', function() { console.log(i) });
        document.body.appendChild(btn);
    }
};
buttons1();


var buttons2 = function() {
    for (var i = 0; i < 5; i++) {
        var btn = document.createElement('button');
        btn.appendChild(document.createTextNode('$Button ' + i));
        (function(private_i) { btn.addEventListener('click', function() { console.log(private_i); }) })(i);
        document.body.appendChild(btn);
    }

}
buttons2();

var button3 = function() {
    for (var i = 0; i < 5; i++) {
        var btn = document.createElement('button');
        btn.appendChild(document.createTextNode('&Button ' + i));
        btn.addEventListener('click', function(private_i) { return function() { console.log(private_i); } }(i));
        document.body.appendChild(btn);
    }
}

button3();

var button4 = function() {
    for (let i = 0; i < 5; i++) {
        var btn = document.createElement('button');
        btn.appendChild(document.createTextNode('%Button ' + i));
        btn.addEventListener('click', function() { console.log(i); });
        document.body.appendChild(btn);
    }
}

button4();

var arr1 = "john".split('');
console.log(arr1);
var arr2 = arr1.reverse();
console.log(arr2);
var arr3 = "jones".split('');
console.log(arr3);

arr2.push(arr3);
// it does not concatenate the two arrays, that’s what the concat() method is for)
console.log(arr1);
console.log(arr2);
console.log(arr3);
console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));
var ne = arr2.concat(arr3);
console.log(ne);
// output:
// "array 1: length=5 last=j,o,n,e,s"
// "array 2: length=5 last=j,o,n,e,s"
// The reverse() method returns a reference to the array itself (i.e., in this case, arr1).
// As a result, arr2 is simply a reference to (rather than a copy of) arr1.
// Therefore, when anything is done to arr2 (i.e., when we invoke arr2.push(arr3);),
// arr1 will be affected as well since arr1 and arr2 are simply references to the same object.


// for (var i = 0; i < 5; i++) {
//     setTimeout(function() { console.log(i); }, i * 1000);
// }
for (var i = 0; i < 5; i++) {
    (function(x) {
        setTimeout(function() { console.log(x); }, x * 1000);
    })(i);
}

console.log("0 || 1 = " + (0 || 1));
console.log("1 || 2 = " + (1 || 2));
console.log("0 && 1 = " + (0 && 1));
console.log("1 && 2 = " + (1 && 2));

// two expressions on either of its sides have the same type and the same value.
console.log(false == '0')
console.log(false === '0')

// Visiting all elements in a tree (DOM) is a classic Depth-First-Search algorithm application.
// Here’s an example solution:
function Traverse(p_element, p_callback) {
    p_callback(p_element);
    var list = p_element.children;
    for (var i = 0; i < list.length; i++) {
        Traverse(list[i], p_callback); // recursive call
    }
}

let obj = {
    a: 1,
    b: 2,
    c: {
        age: 30
    }
};

var objclone = Object.assign({}, obj);
console.log('objclone: ', objclone);

obj.c.age = 45;
console.log('After Change - obj: ', obj);
console.log('After Change = objectclone: ', objclone);

// How do you add an element at the begining of an array?
// How do you add one at the end?
var myArray = ['a', 'b', 'c', 'd'];
myArray.push('end');
myArray.unshift('start');
console.log(myArray);

myA = ['a', 'b', 'c', 'd'];
myA = ['start', ...myA, 'end'];
console.log(myA);

var aa = [1, 2, 3];
aa[10] = 99;
console.log(aa);
console.log(aa[6]);