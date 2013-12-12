//
// Redirects
//

var ansi = require('ansi-styles');

var urls = require('../../config.json').server.redirects;

module.exports = redirects;

// Send 301 Moved Permanently
function redirects(req, res, next) {

    if (req.path in urls) {
        res.redirect(301, urls[req.path]);
        console.log(ansi.yellow.open + '301 Redirect: ' + req.path + ' to: ' + urls[req.path] + ansi.yellow.close);
    } else {
        next();
    }
}
