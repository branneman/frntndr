//
// Views Controller
//

'use strict';

var fs  = require('fs');
var url = require('url');

// Expose module
module.exports = viewsAction;

// Render html views with Swig
function viewsAction(req, res, next) {

    var pathname  = url.parse(req.url).pathname.substr(1);
    var file      = req.app.get('views') + (pathname || 'index.html');
    var validPath = file.substr(-5) === '.html' || file.substr(-1) === '/';

    if (validPath && fs.existsSync(file)) {
        res.render(file, {baseUrl: req.baseUrl});
    } else {
        next();
    }
}
