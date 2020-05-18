(function() {
    let form = document.getElementById('login');

    // the event when the user click submits form
    addEvent(form, 'submit', function(e) {
        // prevent default action of form submitting
        e.preventDefault();

        // elements collection
        let elements = this.elements;

        let username = elements.username.value;
        let msg = 'Welcome' + username;
        document.getElementById('main').textContent = msg;
    });
})();