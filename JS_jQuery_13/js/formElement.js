(function() {
    var els = $('form').elements;

    for (var i = 0, l = els.length; i < l; i++) {
        var e = els[i];
        alert(e.name + " = " + e.value);
    }

})();