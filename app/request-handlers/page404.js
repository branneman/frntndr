/**
 * Page 404 request handler
 */

var url    = require('url'),
    ansi   = require('ansi-styles'),
    config = require('../../config.json');

module.exports = function page404RequestHandler(req, res) {

    var pathname = url.parse(req.url).pathname.substr(1),
        baseUrl  = new Array(pathname.split('/').length).join('../'),
        viewObj  = { baseUrl: baseUrl, req: req };

    // Log 404 page url
    console.log(ansi.red[0] + '404 Not Found: /' + pathname, ansi.red[1]);

    res.status(404).render(req.app.get('views') + config.server.page404, viewObj);

};
