//
// Module: Quick Reference Card
//
define(function iframeHeightResizer() {
    'use strict';

    function resizeIframeHeight(iframe) {
        iframe.style.height = iframe.contentDocument.body.scrollHeight + 10 + 'px';
    }

    return function(iframe) {

        iframe.contentWindow.addEventListener('load', resizeIframeHeight);

        // Load event already fired? Run now
        if (document.readyState === 'complete') {
            resizeIframeHeight(iframe);
        }
    };
});
