define([], function() {
    'use strict';

    return {
        init: function() {
            document.querySelector('html').setAttribute('target', '_blank');
        }
    };
});