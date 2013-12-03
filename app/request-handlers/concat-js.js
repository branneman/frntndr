/**
 * Concatted JavaScript request handler
 */

var fs  = require('fs'),
    url = require('url');

module.exports = function concatJSRequestHandler(req, res) {

    var pathname = url.parse(req.url).pathname.substr(1),
        file     = req.app.get('views') + '/' + (pathname || 'index.html'),
        baseUrl  = new Array(pathname.split('/').length).join('../'),
        viewObj  = { baseUrl: baseUrl, req: req };

    if (file.substr(-3) === '.js' && fs.existsSync(file)) {
        res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
        res.render(file, viewObj);
    }

};
