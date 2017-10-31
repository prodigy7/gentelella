// NProgress
if (typeof NProgress != 'undefined') {
  $(document).ready(function () {
    NProgress.start();
  });

  $(window).on('load', function() {
    NProgress.done();
  });

  $(document).ajaxStart(function() {
    NProgress.start();
  });

  $(document).ajaxComplete(function() {
    NProgress.done();
  });

  $(document).ready(function() {
    NProgress.done();
  });
}
