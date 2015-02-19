//
// Module: Quick Reference Card
//
define(function() {
    'use strict';

    /**
     * @constructor
     */
    function iframeHeightResizer(elem) {
        this.iframe = elem;
        this.bindOnLoad();
        this.onLoad();
    }

    /**
     * Bind events
     */
    iframeHeightResizer.prototype.bindOnLoad = function() {
        document.addEventListener('readystatechange', this.onLoad.bind(this));
    };

    /**
     * Event handler
     */
    iframeHeightResizer.prototype.onLoad = function() {
        if (document.readyState === 'complete') {
            this.iframe.style.height = this.iframe.contentDocument.body.scrollHeight + 10 + 'px';
        }
    };

    /**
     * Expose constructor
     */
    return iframeHeightResizer;
});
