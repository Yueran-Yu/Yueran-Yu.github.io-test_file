(function() {
    let $birth = $('#birthday');
    let $parentsConsent = $('#parents-consent');
    let $consentContainer = $('#consent-container');
    // let now = new Date();
    // alert(now);

    //create the date picker using jQuery UI
    $birth.prop('type', 'text').data('type', 'date').datepicker({ dateFormat: 'yy-mm-dd' });

    $birth.on('blur change', function() {
        var dob = this.value.split('-'); // Array from date
        alert(dob);
        // Pass toggleParentsConsent() the date of birth as a date object
        toggleParentsConsent(new Date(dob[0], dob[1] - 1, dob[2]));
    });

    function toggleParentsConsent(date) {
        if (isNaN(date)) return;
        let now = new Date();
        // alert(now);
        // If diff less than 13 years (ms * seconds * mins * hours * days * years)
        // does not account for leap years!
        // if the user is less than 13 we show parents consent tickbox

        if ((now - date) < 1000 * 60 * 60 * 24 * 365 * 13) {
            $consentContainer.removeClass('hide');
            $parentsConsent.focus();
        } else {
            $consentContainer.addClass('hide');
            $parentsConsent.prop('checked', false);
        }
    }
})();

// (function() {
//     var $birth = $('#birthday'); // D-O-B input
//     var $parentsConsent = $('#parents-consent'); // Consent checkbox
//     var $consentContainer = $('#consent-container'); // Checkbox container

//     // Create the date picker using jQuery UI
//     $birth.prop('type', 'text').data('type', 'date').datepicker({
//         dateFormat: 'yy-mm-dd'
//     });

//     $birth.on('blur change', checkDate); // D-O-B loses focus

//     function checkDate() { // Declare checkDate()
//         var dob = this.value.split('-'); // Array from date
//         alert(dob);
//         // Pass toggleParentsConsent() the date of birth as a date object
//         toggleParentsConsent(new Date(dob[0], dob[1] - 1, dob[2]));
//     }

//     function toggleParentsConsent(date) { // Declare function
//         if (isNaN(date)) return; // Stop if date invalid
//         var now = new Date(); // New date obj: today
//         // If diff less than 13 years (ms * seconds * mins * hours * days * years)
//         // does not account for leap years!
//         // if the user is less than 13 we show parents consent tickbox
//         if ((now - date) < (1000 * 60 * 60 * 24 * 365 * 13)) {
//             $consentContainer.removeClass('hide'); // Remove hide class
//             $parentsConsent.focus(); // Give it focus
//         } else { // Otherwise
//             $consentContainer.addClass('hide'); // Add hide to class
//             $parentsConsent.prop('checked', false); // Set checked to false
//         }
//     }
// }());