/**
 * Static file Controller
 */

var fs  = require('fs'),
    url = require('url');

module.exports = function staticRequestHandler(req, res) {

    var pathname = url.parse(req.url).pathname.substr(1),
        file     = req.app.get('views') + '/' + (pathname || 'index.html');

    if (fs.existsSync(file)) {
        res.sendfile(file);
    }

};
