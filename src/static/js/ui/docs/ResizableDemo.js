//
// Module: Resizable Demo
//
define(function ResizableDemo() {
    'use strict';

    return function(resizableDemo) {

        var resizable = resizableDemo.querySelector('.resizable');

        function resetStyles() {
            resizable.style.left = '';
            resizable.style.marginLeft = '';
            resizable.style.width = '';
            resizable.style.height = '';
        }

        // Event: Open dialog
        resizableDemo.querySelector('.controls .open').addEventListener('click', function() {
            resetStyles();
            resizableDemo.classList.add('fullscreen');
        });

        // Event: Close dialog
        resizableDemo.querySelector('.controls .close').addEventListener('click', function() {
            resetStyles();
            resizableDemo.classList.remove('fullscreen');
        });

        // Events: Resize buttons
        var buttons = resizableDemo.querySelectorAll('.controls .active button:not(.close)');
        Array.prototype.forEach.call(buttons, function(button) {

            button.addEventListener('click', function(evt) {
                resetStyles();

                var width  = evt.target.getAttribute('data-width');
                var height = evt.target.getAttribute('data-height');

                if (width !== 'auto') {
                    resizable.style.width      = width + 'px';
                    resizable.style.height     = height + 'px';
                    resizable.style.left       = '50%';
                    resizable.style.marginLeft = -(parseInt(resizable.style.width, 10) / 2) + 'px';
                }
            });
        });
    };
});
