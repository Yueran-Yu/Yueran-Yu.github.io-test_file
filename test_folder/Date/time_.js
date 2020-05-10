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
console.log(areTheNumbersAlmostEqual(0.1 + 0.2, 0.3));

// (function() {
//     console.log(1);
//     setTimeout(function() { console.log(2) }, 1000);
//     setTimeout(function() { console.log(3) }, 0);
//     console.log(4);
// })();

var buttons = function() {
    for (var i = 0; i < 5; i++) {
        var btn = document.createElement('button');
        btn.appendChild(document.createTextNode('Button ' + i));
        btn.addEventListener('click', function() { console.log(i) });
        document.body.appendChild(btn);
    }
};
buttons();

function isPalindrome(str) {
    str = str.replace(/\W/g, '').toLowerCase();
    console.log(str);
}

isPalindrome('level');