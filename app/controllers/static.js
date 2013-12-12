//
// Static file Controller
//

var fs  = require('fs');
var url = require('url');

// Expose module
module.exports = static;

function static(req, res) {

    var pathname = url.parse(req.url).pathname.substr(1);
    var file     = req.app.get('views') + '/' + (pathname || 'index.html');

    if (fs.existsSync(file)) {
        res.sendfile(file);
    }

}
