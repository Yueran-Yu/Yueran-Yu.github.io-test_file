function addEvent(el, event, callback) {
    if ('addEventListener' in el) {
        el.addEventListener(event, callback, false);
    } else {
        el['e' + event + callback] = callback;
        el[event + callback] = function() {
            el['e' + event + callback](window.event);
        };
        // Use attachEvent()
        // to call the second function, which then calls the first one
        el.attachEvent('on' + event, el[event + callback]);
    }
}