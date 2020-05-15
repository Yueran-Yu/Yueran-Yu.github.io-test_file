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