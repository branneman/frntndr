/**
 * Views & static file request handler
 */

var fs     = require('fs'),
    url    = require('url'),
    ansi   = require('ansi-styles'),
    config = require('../../config.json');

module.exports = function viewsRequestHandler(req, res) {

    var app      = this.app,
        pathname = url.parse(req.url).pathname.substr(1),
        file     = app.get('views') + '/' + (pathname || 'index.html'),
        baseUrl  = new Array(pathname.split('/').length).join('../'),
        viewObj  = { baseUrl: baseUrl, req: req };

    fs.exists(file, function fsExists(exists) {
        if (exists) {
            if (file.substr(-5) === '.html' || file.substr(-1) === '/') {
                res.render(file, viewObj);
            } else if (file.substr(-3) === '.js') {
                res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
                res.render(file, viewObj);
            } else {
                res.sendfile(file);
            }
        } else {
            console.log(ansi.red[0] + '404 Not Found: /' + pathname, ansi.red[1]);
            res.status(404).render(app.get('views') + config.server.page404, viewObj);
        }
    });
};
