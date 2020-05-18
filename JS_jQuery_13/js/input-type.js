(function() {
    let pasword = document.getElementById("pwd");
    let check = document.getElementById("showPwd");

    addEvent(check, 'change', function(e) {
        let target = e.target || e.srcElement;
        try {
            if (target.checked) {
                pasword.type = 'text';
            } else {
                pasword.type = 'password';
            }
        } catch (error) {
            alert('This brower cannot switch type.');
        }
    });
})();