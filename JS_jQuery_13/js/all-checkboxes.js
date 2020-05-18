(function() {
    let form = document.getElementById('interests');
    let all = document.getElementById('all');
    let elements = form.elements;
    let options = elements.genre;
    let count = 0;

    addEvent(all, 'change', function(e) {
        let target = e.target || e.srcElement;
        for (let i = 0; i < options.length; i++) {
            options[i].checked = target.checked;
        }
        count = target.checked ? options.length : 0;
        // alert(count);
    });

    for (let i = 0; i < options.length; i++) {
        addEvent(options[i], 'change', function(e) {
            let target = e.target || e.srcElement;
            if (!target.checked) {
                all.checked = false;
                count--;
                // alert(count);
            } else {
                count++;
                // alert(count);
            }
            if (count === options.length)
                all.checked = true;
        });
    }
})();

// 总结： All 按钮需要单独控制的
// 每个单个复选框也需要单独控制
// 用 count 作为flag 来决定 单独选复选框的时候， 是否需要 给All打钩