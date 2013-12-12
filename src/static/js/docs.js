//
// Resizable Demo module
//

$(function ResizableDemo() {

    'use strict';

    var $resizableDemo = $('.resizable-demo');
    var $resizable     = $('.resizable', $resizableDemo);

    // Open Resizable Demo
    $('.controls .open', $resizableDemo).on('click', function() {
        resetStyles();
        $resizableDemo.addClass('fullscreen');
    });

    // Close Resizable Demo
    $('.controls .close', $resizableDemo).on('click', function() {
        resetStyles();
        $resizableDemo.removeClass('fullscreen');
    });

    // Resize demo
    $('.controls .active button:not(.close)', $resizableDemo).on('click', function() {
        resetStyles();
        var styles = {
            width: $(this).attr('data-width'),
            height: $(this).attr('data-height')
        };
        if (styles.width !== 'auto') {
            styles.left = '50%';
            styles['margin-left'] = -(parseInt(styles.width, 10) / 2);
        }
        $resizable.css(styles);
    });

    var resetStyles = function() {
        $resizable.css({
            left: '',
            'margin-left': '',
            width: '',
            height: ''
        });
    };
});
