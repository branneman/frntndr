describe('Features', function() {
    'use strict';

    it('must have a window.features object', function() {
        expect(window.features).toBeDefined();
    });
    it('must detect canvas support', function() {
        expect(window.features.canvas).toBe(true);
    });
});