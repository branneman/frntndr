/**
 * Page 404 Controller
 */

var url    = require('url'),
    ansi   = require('ansi-styles'),
    config = require('../../config.json');

module.exports = function page404RequestHandler(req, res) {

    // Log 404 page url
    var pathname = url.parse(req.url).pathname.substr(1);
    console.log(ansi.red[0] + '404 Not Found: /' + pathname, ansi.red[1]);

    res.status(404).render(req.app.get('views') + config.server.page404);

};
