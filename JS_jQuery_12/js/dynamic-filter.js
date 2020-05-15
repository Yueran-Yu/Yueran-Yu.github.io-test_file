(function() {

    var people = [{ // Each person is an object
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
        }
    ];

    let rows = [];
    let $min = $('#value-min');
    let $max = $('#value-max');
    let $table = $('#rates');

    function makeRows() {
        // the example takes that idea further: as
        // the code loops through each object in the people array
        // creating a row in the table for that person,

        people.forEach(person => {
            let $row = $('<tr></tr>');
            $row.append($('<td></td>').text(person.name));
            $row.append($('<td></td>').text(person.rate));

            // it also creates a new object for that person and adds it to an array
            // called rows. Its purposes is to create an association between
            // the object for that person in the source data
            // the row for that person in the table

            //the people array already holds information about each person and the rates that
            //
            rows.push({
                person: person,
                $element: $row
            });
        });
    }

    function appendRows() {
        let $tbody = $('<tbody></tbody>');
        rows.forEach(row => { $tbody.append(row.$element) });
        $table.append($tbody);
    }

    function update(min, max) {

        //when deciding which rows to show, the code can then
        // loop through this new array checking the person's rate
        rows.forEach(
            function(row) {
                if (row.person.rate >= min && row.person.rate <= max) {
                    row.$element.show();
                } else {
                    row.$element.hide();
                }
            }
        );
    }

    function init() {
        $('#slider').noUiSlider({
            range: [0, 150],
            start: [65, 90],
            handles: 2,
            margin: 20,
            connect: true,
            serialization: { to: [$min, $max], resolution: 1 }
        }).change(function() { update($min.val(), $max.val()); });
        makeRows();
        appendRows();
        update($min.val(), $max.val());
    }
    $(init);
})();