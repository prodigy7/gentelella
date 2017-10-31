// Switchery
$(document).ajaxComplete(function() {
    initSwitchery();
});

$(document).ready(function() {
    initSwitchery();
});

function initSwitchery() {
    //  if(jQuery().switchery) {
    if ($(".js-switch")[0]) {
        var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
        elems.forEach(function(html) {
            var switchery = new Switchery(html, {
                color: '#26B99A'
            });
        });
    }
    //  }
}