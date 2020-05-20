(function() {
    //1 check both length > 8
    //2 check match
    let password = document.getElementById('password');
    let passwordConfirm = document.getElementById('conf-password');

    function setErrorHighlighter(e) {
        let target = e.target || e.srcElement;
        if (target.value.length < 8) {
            target.className = 'fail';
        } else {
            target.className = 'pass';
        }
    }

    function removeErrorHighlighter(e) {
        let target = e.target || e.srcElement;
        if (target.className === 'fail') {
            target.className = '';
        }
    }

    function passwordMatch(e) {
        let target = e.target || e.srcElement;
        if ((password.value === target.value) && target.value.length >= 8) {
            target.className = 'pass';
        } else {
            target.className = 'fail';
        }
    }

    addEvent(password, 'blur', setErrorHighlighter);
    addEvent(password, 'focus', removeErrorHighlighter);
    addEvent(passwordConfirm, 'blur', passwordMatch);
    addEvent(passwordConfirm, 'focus', removeErrorHighlighter);
})();



// (function () {
//   var password = document.getElementById('password'); // Store password inputs
//   var passwordConfirm = document.getElementById('conf-password');

//   function setErrorHighlighter(e) {
//     var target = e.target || e.srcElement;             // Get target element
//     if (target.value.length < 8) {                     // If its length is < 8
//       target.className = 'fail';                       // Set class to fail
//     } else {                                           // Otherwise
//       target.className = 'pass';                       // Set class to pass
//     }
//   }

//   function removeErrorHighlighter(e) {
//     var target = e.target || e.srcElement;              // Get target element
//     if (target.className === 'fail') {                  // If class shows fail
//       target.className = '';                            // Clear class
//     }
//   }

//   function passwordsMatch(e) {
//     var target = e.target || e.srcElement;               // Get target element
//     // If value matches pwd and it is longer than 8 characters
//     if ((password.value === target.value) && target.value.length >= 8) {
//       target.className = 'pass';                         // Set class to pass
//     } else {                                             // Otherwise
//       target.className = 'fail';                         // Set class to fail
//     }
//   }

//   addEvent(password, 'focus', removeErrorHighlighter);
//   addEvent(password, 'blur', setErrorHighlighter);
//   addEvent(passwordConfirm, 'focus', removeErrorHighlighter);
//   addEvent(passwordConfirm, 'blur', passwordsMatch);
// }());