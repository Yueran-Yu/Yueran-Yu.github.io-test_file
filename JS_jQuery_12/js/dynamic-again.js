(function() {
    let people = [{ // Each person is an object
            name: 'Casey', // It holds name and rate
            rate: 60
        },
        {
            name: 'Camille',
            rate: 80
        },
        {
            name: 'Gordon',
            rate: 75
        },
        {
            name: 'Nigel',
            rate: 120
        },
        {
            name: 'Fine',
            rate: 110
        }
    ];

    let rows = [];
    let $min = $('#value-min');
    let $max = $('#value-max');
    let $tableShow = $('#rates');

    function makeRows() {
        people.forEach(person => {
            $tr = $('<tr></tr>');
            $tr.append($('<td></td>').text(person.name));
            $tr.append($('<td></td>').text(person.rate));

            rows.push({
                person: person,
                $element: $tr
            });
        });
    }

    function appendRows() {
        $tbody = $('<tbody></tbody>');
        rows.forEach(row => $tbody.append(row.$element));
        $tableShow.append($tbody);
    }

    function update(min, max) {
        rows.forEach(row => {
            if (row.person.rate >= min && row.person.rate <= max) {
                row.$element.show();
            } else {
                row.$element.hide();
            }
        });
    }

    function init() {
        $('#slider').noUiSlider({
            range: [0, 150],
            start: [65, 90],
            handles: 2,
            margin: 20,
            connect: true,
            serialization: { to: [$min, $max], resolution: 1 }
        }).change(() => update($min.val(), $max.val()));
        makeRows();
        appendRows();
        update($min.val(), $max.val());
    }
    // this is call immediatelly
    $(init);
})();