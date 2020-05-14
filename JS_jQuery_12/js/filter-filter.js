$(function() {

    //data about people goes here (show on left-hand page)
    var people = [{
            name: 'Casey',
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

    // function priceRange(person) { // Declare priceRange()
    //     return (person.rate >= 65) && (person.rate <= 90); // In range returns true
    // };

    // filter the people array
    var results = [];
    results = people.filter(person => { return person.rate >= 65 && person.rate <= 90 });

    // loop through new array and add matching people to the table
    var $table = $('<tbody></tbody>');
    for (var i = 0; i < results.length; i++) {
        var person = results[i];
        var $row = $('<tr></tr>');

        // put value in the cell value
        var $cell = $('<td></td>').text(person.name);
        $row.append($cell);

        $row.append($('<td></td>').text(person.rate));
        $table.append($row);
    }
    $('thead').after($table);
});