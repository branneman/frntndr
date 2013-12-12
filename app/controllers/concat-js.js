//
// Concatted JavaScript Controller
//

var fs  = require('fs');
var url = require('url');

// Expose module
module.exports = concatJS;

// Render .js file with Swig
function concatJS(req, res) {

    var pathname = url.parse(req.url).pathname.substr(1);
    var file     = req.app.get('views') + '/' + (pathname || 'index.html');

    if (file.substr(-3) === '.js' && fs.existsSync(file)) {
        res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
        res.render(file);
    }

}
