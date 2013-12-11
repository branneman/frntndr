/**
 * Views Controller
 */

var fs  = require('fs'),
    url = require('url');

module.exports = function viewsRequestHandler(req, res, next) {

    var pathname  = url.parse(req.url).pathname.substr(1),
        file      = req.app.get('views') + '/' + (pathname || 'index.html'),
        validPath = file.substr(-5) === '.html' || file.substr(-1) === '/';

    if (validPath && fs.existsSync(file)) {
        res.render(file);
    } else {
        next();
    }
};
