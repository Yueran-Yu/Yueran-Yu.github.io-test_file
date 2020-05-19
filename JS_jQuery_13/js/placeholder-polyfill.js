/*
The HTMLS placeholder attribute lets you put words in text inputs
(to replace labels or to add hints about what to enter).
When the input gains focus and the user starts typing, the text disappears.
But it only works in modern browsers, so this script ensures that the user
sees placeholder text in older browsers too. It is a basic example of a polyfill.
*/

(function() {
    // Test： create an input element, and see if the placeholder is supported
    if ('placeholder' in document.createElement('input')) {
        return;
    }

    let length = document.forms.length;
    for (let i = 0, l = length; i < l; i++) {
        showPlaceholder(document.forms[i].elements);
    }

    function showPlaceholder(elements) {
        for (let i = 0, l = elements.length; i < l; i++) {
            let el = elements[i];
            if (!el.placeholder) {
                continue;
            }

            el.style.color = '#666666';
            el.value = el.placeholder;

            addEvent(el, 'focus', function() {
                if (this.value === this.placeholder) {
                    this.value = '';
                    this.style.color = '#000000';
                }
            });
            addEvent(el, 'blur', function() {
                if (this.value === '') {
                    this.value = this.placeholder;
                    this.style.color = '#666666';
                }
            });
        }
    }
})();