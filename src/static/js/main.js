require.config({
    map: { '*': { conditioner: 'vendor/conditioner/conditioner' } }
});

require(['common/has-js', 'conditioner'], function(hasJS, conditioner) {
    'use strict';

    hasJS.init();
    conditioner.init();
});
