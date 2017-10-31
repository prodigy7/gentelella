// Progressbar
$(document).ready(function() {
    initProgressbar();
});

function initProgressbar() {
    if ($(".progress .progress-bar").length > 0) {
        $('.progress .progress-bar').progressbar();
    }
}
//