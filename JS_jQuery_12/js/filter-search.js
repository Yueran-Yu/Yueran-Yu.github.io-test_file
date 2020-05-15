(function() {
    let $imgs = $('#gallery img');
    let $search = $('#filter-search');
    let cache = [];

    // arrow function doesn't have this keyword?
    $imgs.each(function() {
        cache.push({
            element: this,
            text: this.alt.trim().toLowerCase()
        });
    });

    function filter() {
        let query = this.value.trim().toLowerCase();
        let index = 0;
        cache.forEach(img => {
            if (query) {
                // if the input text has the letters of the alt text
                // it will has the positive number, than display the image
                index = img.text.indexOf(query);
            }
            //set display to a blank string(show the image)
            img.element.style.display = index === -1 ? 'none' : '';
        });
    }

    if ('oninput' in $search[0]) {
        $search.on('input', filter);
    } else {
        $search.on('keyup', filter);
    }
})();