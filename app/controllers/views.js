//
// Views Controller
//

var fs  = require('fs');
var url = require('url');

// Expose module
module.exports = views;

// Render html views with Swig
function views(req, res, next) {

    var pathname  = url.parse(req.url).pathname.substr(1);
    var file      = req.app.get('views') + '/' + (pathname || 'index.html');
    var validPath = file.substr(-5) === '.html' || file.substr(-1) === '/';

    if (validPath && fs.existsSync(file)) {
        res.render(file);
    } else {
        next();
    }
}
