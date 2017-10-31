var currentURL = window.location.href.split('#')[0].split('?')[0];

$(document).ajaxComplete(function() {
  setContentHeight();
});

// Sidebar
//$(document).ready(function() {
    // TODO: This is some kind of easy fix, maybe we can improve this
    var setContentHeight = function () {

        // reset height
        $.rightCol.css('min-height', $(window).height());

        var bodyHeight = $.body.outerHeight(),
            footerHeight = $.body.hasClass('footer_fixed') ? -10 : $.footer.height(),
            leftColHeight = $.leftCol.eq(1).height() + $.sidebarFooter.height(),
            contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

        // normalize content
        contentHeight -= $.navMenu.height() + footerHeight;

        $.rightCol.css('min-height', contentHeight);

        return(true);
    };

    $.sidebarMenu.find('a').on('click', function(ev) {
        var $li = $(this).parent();

        if ($li.is('.active')) {
            $li.removeClass('active active-sm');
            $('ul:first', $li).slideUp(function() {
                setContentHeight();
            });
        } else {
            // prevent closing menu if we are on child menu
            if (!$li.parent().is('.child_menu')) {
                $.sidebarMenu.find('li').removeClass('active active-sm');
                $.sidebarMenu.find('li ul').slideUp();
            }

            $li.addClass('active');

            $('ul:first', $li).slideDown(function() {
                setContentHeight();
            });
        }
    });

    // toggle small or large menu
    $.menuToggle.on('click', function() {
        if ($.body.hasClass('nav-md')) {
            $.sidebarMenu.find('li.active ul').hide();
            $.sidebarMenu.find('li.active').addClass('active-sm').removeClass('active');
        } else {
            $.sidebarMenu.find('li.active-sm ul').show();
            $.sidebarMenu.find('li.active-sm').addClass('active').removeClass('active-sm');
        }

        $.body.toggleClass('nav-md nav-sm');

        setContentHeight();

        $('.dataTable').each ( function () { $(this).dataTable().fnDraw(); });
    });

    // check active menu
    $.sidebarMenu.find('a[href="' + currentURL + '"]').parent('li').addClass('current-page');

    $.sidebarMenu.find('a').filter(function () {
        return this.href == currentURL;
    }).parent('li').addClass('current-page').parents('ul').slideDown(function() {
        setContentHeight();
    }).parent().addClass('active');

    // recompute content when resizing
    $(window).smartresize(function(){  
        setContentHeight();
    });

    setContentHeight();

    // fixed sidebar
    if ($.fn.mCustomScrollbar) {
        $('.menu_fixed').mCustomScrollbar({
            autoHideScrollbar: true,
            theme: 'minimal',
            mouseWheel:{ preventDefault: true }
        });
    }
//});
// /Sidebar
