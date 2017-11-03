'use strict';

/* ================================================================================
   If set, load pages with ajax (asynchronously)
   -------------------------------------------------------------------------------- */
if ($.ajaxLoad) {

    var paceOptions = {
        elements: false,
        restartOnRequestAfter: false
    };

    // Remove unwanted hashes in url
    var url = location.hash.replace(/^#/, '');

    // If url is empty, set default page
    if (url != '') {
        setUpPage(url);
    } else {
        //setUpPage($.defaultPage);
    }

    $(document).on('click', 'a', function (ev) {
        var link = $(this).attr('href');
        var linkTarget = $(this).attr('target') !== undefined ? $(this).attr('target') : '';

        if (setUpPage(link, linkTarget, ev)) {
            ev.preventDefault();
        }
    });
}

/* ================================================================================
   Init given url
   -------------------------------------------------------------------------------- */
function setUpPage(page, pageTarget) {

    page = page !== undefined ? page : '';
    pageTarget = pageTarget !== undefined ? pageTarget : '';

    switch (pageTarget) {
        case '_top':
            window.location = page;
            return (true)
            break;

        case '_blank':
            window.open(page);
            return (true)
            break;

        default:
            switch (page) {
                case '':
                    return (false)
                    break;

                case '#':
                    return (false)
                    break;

                default:
                    if (page.match(/javascript\:/gi)) {
                        window.location = page;
                    } else if (page.match(/\:\/\//gi)) {
                        window.location = page;
                        return (false)
                    } else {
                        if (page.match(/^\#/gi)) {
                            //window.location = page;
                            return (false)
                        } else {
                            loadPage(page);
                            return (true)
                        }
                    }
                    break;
            }
            break;
    }
    return (false)
}

/* ================================================================================
   Load given page
   -------------------------------------------------------------------------------- */
function loadPage(url) {

    //alert($.pagesDirectory + url);
    $.ajax({
        type: 'GET',
        url: $.pagesDirectory + url,
        dataType: 'html',
        cache: false,
        async: false,
        beforeSend: function () {
            $.mainContent.css({
                opacity: 0
            });
        },
        success: function () {
            //Pace.restart();
            $('html, body').animate({
                scrollTop: 0
            }, 0);
            $.mainContent.load($.pagesDirectory + url, null, function (responseText) {
                window.location.hash = url;
                loadJS(requireJS);
                $(window).ready(function () {
                    NProgress.done();
                    sidebar.setActive();
                });
            }).delay(0).animate({
                opacity: 1
            }, 0);

        },
        error: function () {
            window.location.href = $.page404;
        }

    });
}