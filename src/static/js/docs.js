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
        $resizable.css({
            width: $(this).attr('data-width'),
            height: $(this).attr('data-height')
        });
    });

}());
