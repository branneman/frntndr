//
// Container for all controllers
//

'use strict';

module.exports = {
    svg2png:  require('./svg2png'),
    docs:     require('./docs'),
    concatJS: require('./concat-js'),
    static:   require('./static'),
    views:    require('./views'),
    page404:  require('./page404')
};
