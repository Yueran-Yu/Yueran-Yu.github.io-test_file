var compare = {
    // add a method called name
    name: function(a, b) {
        // remove the from start of parameter
        a = a.replace(/^the /i, '');
        // remove the from start of parameter
        b = b.replace(/^the /i, '');

        if (a < b) {
            return -1;
        } else {
            return a > b ? 1 : 0;
        }
    },
    duration: function(a, b) {
        a = a.split(':');
        b = b.split(':');

        a = Number(a[0] * 60 + Number(a[1]));
        b = Number(b[0] * 60 + Number(a[1]));

        return a - b;
    },

    date: function(a, b) {
        a = new Date(a);
        b = new Date(b);

        return a - b;
    }
};

$('.sortable').each(function() {
    $table = $(this);
    $tbody = $table.find('tbody');
    $controls = $table.find('th');
    let rows = $tbody.find('tr').toArray();

    $controls.on('click', function() {
        let $header = $(this); // don't know the meaning of this mean the current button the user click

        let order = $header.data('sort'); // get value of data-sort attribute
        let column;

        //if selected item has ascending or descending class
        // reverse contents
        if ($header.is('.ascending') || $header.is('.descending')) {
            $header.toggleClass('ascending descending');
            $tbody.append(rows.reverse());
        } else {
            $header.addClass('ascending');
            $header.siblings().removeClass('ascending descending');
            column = $controls.index(this);

            if (compare.hasOwnProperty(order)) {
                column = $controls.index(this);
                alert(column);
                rows.sort(function(a, b) {
                    a = $(a).find('td').eq(column).text();
                    b = $(b).find('td').eq(column).text();
                    return compare[order](a, b);
                });
                $tbody.append(rows);
            }
        }
    });
});