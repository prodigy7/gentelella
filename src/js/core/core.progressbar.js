// Progressbar
$(document).ajaxComplete(function() {
  initProgressbar();
});

$(document).ready(function() {
  initProgressbar();
});

function initProgressbar() {
  if(jQuery().progressbar) {
    if ($(".progress .progress-bar")[0]) {
      $('.progress .progress-bar').progressbar();
    }
  }
}
