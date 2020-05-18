(function() {
    let form = document.getElementById('newPwd');
    let pwd = document.getElementById('pwd');
    let sbmt = document.getElementById('submit');

    //the submit button is disabled at the start of the script
    sbmt.disabled = true;
    sbmt.className = 'disabled';

    let submitted = false;

    addEvent(pwd, 'input', function(e) {
        let target = e.target || e.srcElement;
        // if the value is falsey (e.g. 0, "", null, undefined
        // (see also All falsey values in JavaScript)), it will be treated as false;
        // otherwise it's treated as true.
        // if the second value(!target.value) is true (has no value, or value is empty)
        // the final result (submitted || !target.value) is true
        // which means the sbmt.disabled = true;
        // this will prevent the submit button for clicking
        sbmt.disabled = submitted || !target.value;
        // if form has been submitted or pwd has no value
        // set CSS to disabled
        sbmt.className = (!target.value || submitted) ? "disabled" : "enabled";
    });
    addEvent(form, 'submit', function(e) {
        if (sbmt.disabled || submitted) {
            e.preventDefault();
            return;
        }

        sbmt.disabled = true;
        submitted = true;
        sbmt.className = 'disabled';

        e.preventDefault();
        alert('Password is ' + pwd.value);
    });
})();