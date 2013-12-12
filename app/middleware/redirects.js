//
// Redirects
//

'use strict';

var ansi = require('ansi-styles');

var urls = require('../../config.json').server.redirects;

module.exports = redirects;

// Send 301 Moved Permanently
function redirects(req, res, next) {

    if (req.path in urls) {
        console.log(
            '301 Redirect: ' +
            ansi.yellow.open + req.path + ansi.yellow.close +
            ' to: ' +
            ansi.yellow.open + urls[req.path] + ansi.yellow.close
        );
        res.redirect(301, urls[req.path]);
    } else {
        // Fall-through to next middleware
        next();
    }
}
