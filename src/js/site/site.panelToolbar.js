// Panel toolbox
$(document).ready(function() {
    $('.collapse-link').on('click', function() {

        $.boxPanel = $(this).closest('.x_panel');
        $.icon = $(this).find('i');
        $.boxContent = $.boxPanel.find('.x_content');

        // fix for some div with hardcoded fix class
        if ($.boxPanel.attr('style')) {
            $.boxContent.slideToggle(200, function(){
                $.boxPanel.removeAttr('style');
            });
        } else {
            $.boxContent.slideToggle(200);
            $.boxPanel.css('height', 'auto');
        }

        $.icon.toggleClass('fa-chevron-up fa-chevron-down');
    });

    $('.close-link').click(function () {
        $.boxPanel = $(this).closest('.x_panel');
        $.boxPanel.remove();
    });
});
// /Panel toolbox
