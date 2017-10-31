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
$.leftCol = $('.leftCol');
$.rightCol = $('.rightCol');
$.navMenu = $('.navMenu');
$.footer = $('footer');

'use strict';

/* ================================================================================
   Function for load JS files asynchronously in ajax mode
   -------------------------------------------------------------------------------- */
function loadJS(jsFiles, pageScript) {

  var i;
  for(i = 0; i<jsFiles.length;i++) {

    var body = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = false;
    script.src = jsFiles[i];
    body.appendChild(script);
  }

  if (pageScript) {
    var body = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = false;
    script.src = pageScript;
    body.appendChild(script);
  }

  //init();
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
      }).delay(250).animate({ opacity : 1 }, 0);
    },
    error : function() {
      window.location.href = $.page404;
    }

  });
}

var currentURL = window.location.href.split('#')[0].split('?')[0];

// Sidebar
$(document).ready(function() {
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
});
// /Sidebar
