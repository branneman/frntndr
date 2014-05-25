//
// Static file Controller
//

'use strict';

var fs  = require('fs');
var url = require('url');

// Expose module
module.exports = staticAction;

function staticAction(req, res, next) {

    var path = url.parse(req.url).pathname.substr(1);
    var file = req.app.get('views') + '/' + (path || 'index.html');

    if (fs.existsSync(file)) {
        res.sendfile(file);
    } else {
        next();
    }

}
