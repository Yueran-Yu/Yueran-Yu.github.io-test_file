"use strict";
let person = 'Mike';
let age = 28;

function myTag(strings, personExp, ageExp) {
    let str0 = strings[0];
    let str1 = strings[1];

    let ageStr;
    if (ageExp > 99) {
        ageStr = 'centenarian';
    } else {
        ageStr = 'youngster';
    }


    return `${str0}${personExp}${str1}${ageStr}`;
}

let output = myTag `That ${person} is a ${age}`;
console.log(output);

function tag(strings) {
    console.log(strings.raw[0]);
}
tag `string text line 1 \n string text line 2`;

let str = String.raw `Hi\n${2+3}!`;
console.log(str);
console.log(str.length);
console.log(Array.from(str).join(','));

var counter = (function() {
    var i = 0;
    return {
        get: function() {
            return i;
        },
        set: function(val) {
            i = val;
        },
        increment: function() {
            return ++i;
        }
    };
})();
console.log(`counter.get(): ${counter.get()}`);
console.log(`counter.set(): ${counter.set(3)}`);
console.log(`counter.increment(): ${counter.increment()}`);
console.log(`counter.increment()}: ${counter.increment()}`);


function varValue() {
    for (var i = 0; i < 5; i++) {
        var btn = document.createElement('button');
        btn.appendChild(document.createTextNode('%Button ' + i));
        btn.addEventListener('click', function() { console.log(i); });
        document.body.appendChild(btn);
    }

}

// varValue();

function varValue1() {
    for (var i = 0; i < 5; i++) {
        var btn = document.createElement('button');
        btn.appendChild(document.createTextNode('&Button ' + i));
        btn.addEventListener('click', (function(i) {
            return function() { console.log(i); };
        })(i));
        document.body.appendChild(btn);
    }
}

// varValue1();


function letValue() {
    for (let i = 0; i < 5; i++) {
        var btn = document.createElement('button');
        btn.appendChild(document.createTextNode('￥Button ' + i));
        btn.addEventListener('click', function() { console.log(i); });
        document.body.appendChild(btn);
    }
}

// letValue();

function detailLet() {
    for (let i = 0; i < 5; i++) {
        // console.log("first: " + i);
        // let i = "abc";
        console.log("Changed: ", i);
    }
}

// detailLet();

// var _loop = function _loop(i) {
//     a[i] = function() { console.log(i); }
// }

// for (var i = 0; i < 5; i++) {
//     console.log(_loop(i));
// }

function outter() {
    var privateg = "I am private";

    function show() {
        console.log(privateg);
    }
    return show;
}

var ref = outter();
console.log(`This is a reference: ${ref}`);
ref();
// console.log(val);

function makeAdder(x) {
    return function(y) {
        return x + y;
    }
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));
console.log(add10(2));

// window.onload = function() //函数1
//     {
//         var list = document.getElementsByTagName('li');
//         for (var i = 0; i < list.length; i++) {
//             list[i].onclick = function() { alert(i); } //函数2
//         }
//     }


window.onload = function() // 函数1
    {
        var list = document.getElementsByTagName('li');
        for (var i = 0; i < list.length; i++) {
            //函数2                          // 函数3
            list[i].onclick = (function(private_i) { return function() { alert(private_i); } })(i); //这里将i作为参数，调用函数2
        }
    }

if (true) {
    var test = true;
}

// alert(test);

for (var i = 0; i < 1000; i++) {
    setTimeout(function() {
        console.log(i);
    }, 10);
}