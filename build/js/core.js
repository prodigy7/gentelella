/**
 * Resize function without multiple trigger
 * 
 * Usage:
 * $(window).smartresize(function(){  
 *     // code here
 * });
 */
(function($,sr){
    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    var debounce = function (func, threshold, execAsap) {
      var timeout;

        return function debounced () {
            var obj = this, args = arguments;
            function delayed () {
                if (!execAsap)
                    func.apply(obj, args); 
                timeout = null; 
            }

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100); 
        };
    };

    // smartresize 
    jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');
// Accordion
$(document).ready(function() {
    $(".expand").on("click", function () {
        $(this).next().slideToggle(200);
        $expand = $(this).find(">:first-child");

        if ($expand.text() == "+") {
            $expand.text("-");
        } else {
            $expand.text("+");
        }
    });
});

// iCheck
$(document).ajaxComplete(function() {
  initCheckbox();
});

/*$(document).ready(function() {
  initCheckbox();
});*/

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

/* ================================================================================
   Basic configuration
   -------------------------------------------------------------------------------- */

// If set, pages are loaded dynamically
$.ajaxLoad = true;

// Set default (index) page
$.defaultPage = 'index1.html';

// Set directory where pages are found
$.pagesDirectory = './';

// Set page page not found template
$.page404 = './page_404.html';

$.mainContent = $('#main');

/* ================================================================================
   Static configuration
   -------------------------------------------------------------------------------- */
$.body = $('body');
$.menuToggle = $('#menuToggle');
$.sidebarMenu = $('#sidebar-menu');
$.sidebarFooter = $('.sidebar-footer');
$.leftCol = $('.left_col');
$.rightCol = $('.right_col');
$.navMenu = $('.nav_menu');
$.footer = $('footer');

'use strict';

/* ================================================================================
   Function for load JS files asynchronously in ajax mode
   -------------------------------------------------------------------------------- */
function loadJS(jsFiles) {

  var i;
  for(i = 0; i<jsFiles.length;i++) {

    var body = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = false;
    script.src = jsFiles[i];
    body.appendChild(script);
  }
}

/* ================================================================================
   Function for load CSS files asynchronously in ajax mode
   -------------------------------------------------------------------------------- */
function loadStyle(cssFile, end, callback) {

  var cssArray = {};

  if (!cssArray[cssFile]) {
    cssArray[cssFile] = true;

    if (end == 1) {

      var head = document.getElementsByTagName('head')[0];
      var styleLink = document.createElement('link');
      styleLink.setAttribute('rel', 'stylesheet');
      styleLink.setAttribute('type', 'text/css');
      styleLink.setAttribute('href', cssFile);

      styleLink.onload = callback;
      head.appendChild(styleLink);

    } else {

      var head = document.getElementsByTagName('head')[0];
      var style = document.getElementById('main-style'); //<---

      var styleLink = document.createElement('link');
      styleLink.setAttribute('rel', 'stylesheet');
      styleLink.setAttribute('type', 'text/css');
      styleLink.setAttribute('href', cssFile);

      styleLink.onload = callback;
      head.insertBefore(styleLink, style);
    }

  } else if (callback) {
    callback();
  }

}

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
    setUpPage($.defaultPage);
  }

  $(document).on('click', '.nav a[href!="#"]', function(e) {
//    alert("OK");
    if ( $(this).parent().parent().hasClass('nav-tabs') || $(this).parent().parent().hasClass('nav-pills') ) {
      e.preventDefault();
    } else if ( $(this).attr('target') == '_top' ) {
      e.preventDefault();
      var target = $(e.currentTarget);
      window.location = (target.attr('href'));
    } else if ( $(this).attr('target') == '_blank' ) {
      e.preventDefault();
      var target = $(e.currentTarget);
      window.open(target.attr('href'));
    } else {
      e.preventDefault();
      var target = $(e.currentTarget);
      setUpPage(target.attr('href'));
    }
  });

  $(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
  });
}

/* ================================================================================
   Init given url
   -------------------------------------------------------------------------------- */
function setUpPage(url) {

/*  $('nav .nav li .nav-link').removeClass('active');
  $('nav .nav li.nav-dropdown').removeClass('open');
  $('nav .nav li:has(a[href="' + url.split('?')[0] + '"])').addClass('open');
  $('nav .nav a[href="' + url.split('?')[0] + '"]').addClass('active');*/

  if(url !== undefined) {
    loadPage(url);
  }
}

/* ================================================================================
   Load given page
   -------------------------------------------------------------------------------- */
function loadPage(url) {

//alert($.pagesDirectory + url);
  $.ajax({
    type : 'GET',
    url : $.pagesDirectory + url,
    dataType : 'html',
    cache : false,
    async: false,
    beforeSend : function() {
      $.mainContent.css({ opacity : 0 });
    },
    success : function() {
      //Pace.restart();
      $('html, body').animate({ scrollTop: 0 }, 0);
      $.mainContent.load($.pagesDirectory + url, null, function (responseText) {
        window.location.hash = url;
        $(window).ready(function() {
          loadJS(requireJS);
        });
      }).delay(250).animate({ opacity : 1 }, 0);

    },
    error : function() {
      window.location.href = $.page404;
    }

  });
}

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

// Progressbar
$(document).ajaxComplete(function() {
  initProgressbar();
});

$(document).ready(function() {
  initProgressbar();
});

function initProgressbar() {
//  if(jQuery().progressbar) {
    if ($(".progress .progress-bar")[0]) {
      $('.progress .progress-bar').progressbar();
    }
//  }
}

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
/*        var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
        elems.forEach(function (html) {
            var switchery = new Switchery(html, {
                color: '#26B99A'
            });
        });*/
    }
//  }
}

// Table
$('table input').on('ifChecked', function () {
    checkState = '';
    $(this).parent().parent().parent().addClass('selected');
    countChecked();
});
$('table input').on('ifUnchecked', function () {
    checkState = '';
    $(this).parent().parent().parent().removeClass('selected');
    countChecked();
});

var checkState = '';

$('.bulk_action input').on('ifChecked', function () {
    checkState = '';
    $(this).parent().parent().parent().addClass('selected');
    countChecked();
});
$('.bulk_action input').on('ifUnchecked', function () {
    checkState = '';
    $(this).parent().parent().parent().removeClass('selected');
    countChecked();
});
$('.bulk_action input#check-all').on('ifChecked', function () {
    checkState = 'all';
    countChecked();
});
$('.bulk_action input#check-all').on('ifUnchecked', function () {
    checkState = 'none';
    countChecked();
});

function countChecked() {
    if (checkState === 'all') {
        $(".bulk_action input[name='table_records']").iCheck('check');
    }
    if (checkState === 'none') {
        $(".bulk_action input[name='table_records']").iCheck('uncheck');
    }

    var checkCount = $(".bulk_action input[name='table_records']:checked").length;

    if (checkCount) {
        $('.column-title').hide();
        $('.bulk-actions').show();
        $('.action-cnt').html(checkCount + ' Records Selected');
    } else {
        $('.column-title').show();
        $('.bulk-actions').hide();
    }
}

// Tooltip
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip({
        container: 'body'
    });
});
// /Tooltip
