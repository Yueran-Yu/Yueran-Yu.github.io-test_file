// get these three elements
(function() {
    let form = document.getElementById('how-heard');
    let options = form.elements.heard;
    let other = document.getElementById('other');
    let otherText = document.getElementById('other-text');
    otherText.className = 'hide';


    for (let i = 0; i < options.length; i++) {
        addEvent(options[i], 'click', () => {
            hide = other.checked ? '' : 'hide';
            otherText.className = hide;
            if (hide) {
                otherText.value = '';
            }
        });
    }
})();