/**
 * Resizable Demo module
 */
$(function ResizableDemo() {

    var $resizableDemo = $('.resizable-demo'),
        $resizable     = $('.resizable', $resizableDemo);

    // Open Resizable Demo
    $('.controls .open', $resizableDemo).on('click', function() {
        $resizableDemo.addClass('fullscreen');
    });

    // Close Resizable Demo
    $('.controls .close', $resizableDemo).on('click', function() {
        $resizableDemo.removeClass('fullscreen');
    });

    // Resize demo
    $('.controls .active button:not(.close)', $resizableDemo).on('click', function() {
        var styles = {
            left: '',
            'margin-left': '',
            width: $(this).attr('data-width'),
            height: $(this).attr('data-height')
        };
        if (styles.width !== 'auto') {
            styles.left = '50%';
            styles['margin-left'] = -(parseInt(styles.width, 10) / 2);
        }
        $resizable.css(styles);
    });

}());
