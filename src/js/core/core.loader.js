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
