    document.forms.register.noValidate = true;
    $('form').on('submit', function(e) {
        var elements = this.elements;
        var valid = {};
        var isValid;
        var isFormValid;

        var i;
        for (i = 0, l = elements.length; i < l; i++) {
            isValid = validateRequired(elements[i]) && validateTypes(elements[i]);
            if (!isValid) {
                showErrorMessage(elements[i]);
            } else {
                removeErrorMessage(elements[i]);
            }
            valid[elements[i].id] = isValid;
        }


        if (!validateBio()) {
            showErrorMessage(document.getElementById('bio'));
            valid.bio = false;
        } else {
            removeErrorMessage(document.getElementById('bio'));
        }

        if (!validatePassword()) {
            showErrorMessage(document.getElementById('password'));
            valid.password = false;
        } else {
            removeErrorMessage(document.getElementById('password'));
        }

        if (!validateParentsConsent()) {
            showErrorMessage(document.getElementById('parents-consent'));
            valid.parentsConsent = false;
        } else {
            removeErrorMessage(document.getElementById('parents-consent'));
        }

        for (var field in valid) {
            if (!valid[field]) {
                isFormValid = false;
                break;
            }
            isFormValid = true;
        }

        if (!isFormValid) {
            e.preventDefault();
        }
    });

    function validateRequired(el) {
        if (isRequired(el)) { // Is this element required?
            var valid = !isEmpty(el); // Is value not empty (true / false)?
            if (!valid) { // If valid variable holds false
                setErrorMessage(el, 'Field is required'); // Set the error message
            }
            return valid; // Return valid variable (true or false)?
        }
        return true; // If not required, all is ok
    }

    function isRequired(el) {
        return ((typeof el.required === 'boolean') && el.required) ||
            (typeof el.required === 'string');
    }

    function isEmpty(el) {
        return !el.value || el.value === el.placeholder;
    }

    function validateTypes(el) {
        if (!el.value) return true; // If element has no value, return true
        // Otherwise get the value from .data()
        var type = $(el).data('type') || el.getAttribute('type'); // OR get the type of input
        if (typeof validateType[type] === 'function') { // Is the type a method of validate object?
            return validateType[type](el); // If yes, check if the value validates
        } else { // If not
            return true; // Return true because it cannot be tested
        }
    }

    function validateParentsConsent() {
        var parentsConsent = document.getElementById('parents-consent');
        var consentContainer = document.getElementById('consent-container');
        var valid = true; // Variable: valid set to true
        if (consentContainer.className.indexOf('hide') === -1) { // If checkbox shown
            valid = parentsConsent.checked; // Update valid: is it checked/not
            if (!valid) { // If not, set the error message
                setErrorMessage(parentsConsent, 'You need your parents\' consent');
            }
        }
        return valid; // Return whether valid or not
    }

    function validateBio() {
        var bio = document.getElementById('bio');
        var valid = bio.value.length <= 140;
        if (!valid) {
            setErrorMessage(bio, 'Please make sure your bio does not exceed 140 characters');
        }
        return valid;
    }

    function validatePassword() {
        var password = document.getElementById('password');
        var valid = password.value.length >= 8;
        if (!valid) {
            setErrorMessage(password, 'Please make sure your password has at least 8 characters');
        }
        return valid;
    }

    function setErrorMessage(el, message) {
        $(el).data('errorMessage', message); // Store error message with element
    }

    function getErrorMessage(el) {
        return $(el).data('errorMessage') || el.title; // Get error message or title of element
    }

    function showErrorMessage(el) {
        var $el = $(el); // The element with the error
        var $errorContainer = $el.siblings('.error.message'); // Any siblings holding an error message

        if (!$errorContainer.length) { // If no errors exist with the element
            $errorContainer = $('<span class="error message"></span>').insertAfter($el);
        }
        $errorContainer.text(getErrorMessage(el)); // Add error message
    }

    function removeErrorMessage(el) {
        var errorContainer = $(el).siblings('.error.message'); // Get the sibling of this form control used to hold the error message
        errorContainer.remove(); // Remove the element that contains the error message
    }

    var validateType = {
        email: function(el) { // Create email() method
            var valid = /[^@]+@[^@]+/.test(el.value); // Store result of test in valid
            if (!valid) { // If the value of valid is not true
                setErrorMessage(el, 'Please enter a valid email'); // Set error message
            }
            return valid; // Return the valid variable
        },
        number: function(el) { // Create number() method
            var valid = /^\d+$/.test(el.value); // Store result of test in valid
            if (!valid) {
                setErrorMessage(el, 'Please enter a valid number');
            }
            return valid;
        },
        date: function(el) { // Create date() method
            // Store result of test in valid
            var valid = /^(\d{2}\/\d{2}\/\d{4})|(\d{4}-\d{2}-\d{2})$/.test(el.value);
            if (!valid) { // If the value of valid is not true
                setErrorMessage(el, 'Please enter a valid date'); // Set error message
            }
            return valid; // Return the valid variable
        }
    };

    }()); // End of IIFE