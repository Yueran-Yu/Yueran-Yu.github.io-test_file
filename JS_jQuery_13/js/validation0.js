(function() {
    document.forms.register.noValidate = true;

    //A: when click the submit button, anonymous function will be triggered
    $('form').on('submit', function(e) {
        let elements = this.elements; // collection of form controls
        let valid = {}; //custom valid object
        let isValid; // isValid: checks form controls
        let isFormValid; //isFormValid: checks entire form

        // perform generic checks (calls functions outside the event handler)
        for (let i = 0, l = elements.length; i < l; i++) {
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

        if (!validateParentConsent()) {
            showErrorMessage(document.getElementById('parents-consent'));
            valid.parentsConsent = false;
        } else {
            removeErrorMessage(document.getElementById('parents-consent'));
        }
        for (let field in valid) {
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

    function isRequired(el) {
        return (((typeof el.required === 'boolean') && el.required) || (typeof el.required === 'string'));
    }

    function isEmpty(el) {
        return !el.value || el.value === el.placeholder;
    }

    function validateTypes(el) {
        if (!el.value) return true;

        let type = $(el).data('type') || el.getAttribute('type');
        if (typeof validateType[type] === 'function') {
            return validateType[type](el);
        } else {
            return true;
        }
    }

    //B: functions for generic checks
    // check if the field is required and if so does it have a value
    // relies on isRequired() and isEmpty() both show below, and setErrorMessage - shown later.
    function validateRequired(el) {
        if (isRequired(el)) {
            let valid = !isEmpty(el);
            if (!valid) {
                setErrorMessage(el, 'Field is required');
            }
            return valid;
        }
        return true;
    }

    //C: functions for custom validation
    function validateParentConsent() {
        let parentsConsent = document.getElementById('parents-consent');
        let consentContainer = document.getElementById('consent-container');

        let valid = true;
        if (consentContainer.className.indexOf('hide') === -1) {
            valid = parentsConsent.checked;
            if (!valid) {
                setErrorMessage(parentsConsent, 'You need your parents\' consent');
            }
        }
        return valid;
    }

    function validateBio() {
        let bio = document.getElementById('bio');
        let valid = bio.value.length <= 140;
        if (!valid) {
            setErrorMessage(bio, 'Please make sure your characters less than 140.');
        }
        return valid;
    }

    function validatePassword() {
        let pwd = document.getElementById('password');
        let valid = pwd.value.length >= 8;
        if (!valid) {
            setErrorMessage(pwd, 'Please make sure your password has at least 8 characters');
        }
        return valid;
    }

    //D: functions to set / get / show / remove error messages
    function setErrorMessage(el, message) {
        $(el).date('errorMessage', message);
    }

    function getErrorMessage(el) {
        return $(el).data('errorMessage') || el.title;
    }

    function showErrorMessage(el) {
        let $el = $(el);
        let errorContainer = $el.siblings('.error.message');
        if (!errorContainer.length) {
            errorContainer = $('<span class="error message"></span>').insertAfter($el);
        }
        errorContainer.text(getErrorMessage(el)); // Add error message
    }

    function removeErrorMessage(el) {
        let errorContainer = $(el).siglings('.error.message');
        errorContainer.remove();
    }

    //E: object for checking types
    let validateType = {
        email: function(el) {
            // checks for a single @ in the email
            let valid = /[^@]+@[^@]+/.test(el.value);
            if (!valid) {
                setErrorMessage(el, 'Please enter a valid email');
            }
            return valid;
        },
        number: function(el) {
            let valid = /^\d+$/.test(el.value);
            if (!valid) {
                setErrorMessage(el, 'Please enter a valid number');
            }
            return valid;
        },

        date: function(el) {
            let valid = /^(\d{2}\/\d{2}\/\d{4})|(\d{4}-\d{2}-\d{2})$/.test(el.value);
            if (!valid) {
                setErrorMessage(el, 'Please enter a valid date');
            }
            return valid;
        }
    }
})();