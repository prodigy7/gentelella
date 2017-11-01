// Progressbar
$(document).ready(function() {
    initProgressbar();
});

$(document).ajaxComplete(function() {
    initProgressbar();
});

function initProgressbar() {
    if ($(".progress .progress-bar")[0]) {
        $('.progress .progress-bar').progressbar();
    }
}
//