describe('HasJS', function() {
    it('will add the has-js html class', function() {
        expect($('html').hasClass('has-js')).toBe(true);
    });
});