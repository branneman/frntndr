/**
 * Whenever this grows out of hand, replace it with a custom Modernizr build
 */
window.features = {
    svg:    document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Shape', '1.0'),
    canvas: !!document.createElement('canvas').getContext
};
