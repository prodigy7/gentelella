'use strict';

/* ================================================================================
   Function for load JS files asynchronously in ajax mode
   -------------------------------------------------------------------------------- */
function loadJS(jsFiles) {

    var i;
    for (i = 0; i < jsFiles.length; i++) {

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
function loadCSS(cssFiles) {

    var i;
    for (i = 0; i < cssFiles.length; i++) {

        var head = document.getElementsByTagName('head')[0];
        var style = document.getElementById('main-style');

        var styleLink = document.createElement('link');
        styleLink.setAttribute('rel', 'stylesheet');
        styleLink.setAttribute('type', 'text/css');
        styleLink.setAttribute('href', cssFiles[i]);
        /*
        if (media != '') {
            styleLink.setAttribute('media', media);
        }

        styleLink.onload = callback;
        */
        head.insertBefore(styleLink, style);

    }
}

function loadStyle(cssFile, end, callback, media) {

    var media = media !== undefined ? media : '';

    var cssArray = {};

    if (!cssArray[cssFile]) {
        cssArray[cssFile] = true;

        if (end == 1) {

            var head = document.getElementsByTagName('head')[0];
            var styleLink = document.createElement('link');
            styleLink.setAttribute('rel', 'stylesheet');
            styleLink.setAttribute('type', 'text/css');
            styleLink.setAttribute('href', cssFile);
            if (media != '') {
                styleLink.setAttribute('media', media);
            }

            styleLink.onload = callback;
            head.appendChild(styleLink);

        } else {

            var head = document.getElementsByTagName('head')[0];
            var style = document.getElementById('main-style'); //<---

            var styleLink = document.createElement('link');
            styleLink.setAttribute('rel', 'stylesheet');
            styleLink.setAttribute('type', 'text/css');
            styleLink.setAttribute('href', cssFile);
            if (media != '') {
                styleLink.setAttribute('media', media);
            }

            styleLink.onload = callback;
            head.insertBefore(styleLink, style);
        }

    } else if (callback) {
        callback();
    }
}