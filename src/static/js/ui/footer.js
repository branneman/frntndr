//
// Makes the footer link to Github open in a new tab/window
//
define(function() {
    'use strict';

    return function(element) {
        element.setAttribute('target', '_blank');
    };
});
