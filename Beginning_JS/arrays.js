let numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let oddNumbers = numberArray.filter((value, index, array) => {
    if (value % 2) {
        // console.log(value);
        return value;
    }
});
console.log(oddNumbers);
let mappedValue = [1, 2, 3].map(value => { return (value + 1) * 10; });
console.log(mappedValue);


function sayHello(firstName, lastName) {
    let msg = "Greeting ";

    function intro() {
        return msg + firstName + " " + lastName;
    }
    return intro();
};
let soe = sayHello("Professor", "Falken");
// console.log(soe);

const sayhell = function() {
    let greetingMsg = "Greetings ";

    function msgTo(firstName, lastName) {
        greetingMsg = greetingMsg + firstName + " " + lastName;
    }
    return {
        sendGreeting: function(firstName, lastName) {
            msgTo(firstName, lastName);
        },

        getMsg: function() {
            return greetingMsg;
        }
    }
}

const createMsg = sayhell();
createMsg.sendGreeting("Professor", "Falken");
console.log(createMsg.getMsg());

createMsg.sendGreeting("Baybe", "I love you");
console.log(createMsg.getMsg());