// iCheck
$(document).ajaxComplete(function() {
  initCheckbox();
});

$(document).ready(function() {
  initCheckbox();
});

function initCheckbox() {
  if(jQuery().iCheck) {
    if ($("input.flat")[0]) {
        $(document).ready(function () {
            $('input.flat').iCheck({
                checkboxClass: 'icheckbox_flat-green',
                radioClass: 'iradio_flat-green'
            });
        });
    }
  }
}
