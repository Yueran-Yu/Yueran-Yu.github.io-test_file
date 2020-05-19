// users can enter a biography of up to 140 characters
// when the cursor is in the textarea, a <span> element will be show with a count
// of how many characters the user has remaining.
// when the textarea loses focus, this message is hidden.

(function() {
    let bio = document.getElementById('bio');
    let bioCount = document.getElementById('bio-count');

    addEvent(bio, 'focus', updateCounter);

    // each time you enter the letters, this event will
    // be triggered and then update the textarea box.
    addEvent(bio, 'input', updateCounter);

    addEvent(bio, 'blur', function() {
        if (bio.value.length <= 140) {
            bioCount.className = 'hide';
        }
    });

    function updateCounter(e) {
        let target = e.target || e.srcElement;
        let count = 140 - target.value.length;
        if (count < 0) {
            bioCount.className = 'error';
        } else if (count < 15) {
            bioCount.className = 'warn';
        } else {
            bioCount.className = 'good';
        }
        let charLeft = '<b>' + count + '</b>' + ' characters left.';
        bioCount.innerHTML = charLeft;
    }
})();