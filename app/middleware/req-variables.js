//
// Sets common variables to the request object
//

'use strict';

var url = require('url');

// Expose module
module.exports = setRequestVariables;

function setRequestVariables(req, res, next) {

    // baseUrl
    var pathname = url.parse(req.url).pathname.substr(1);
    req.baseUrl  = new Array(pathname.split('/').length).join('../');

    // Fall-through to next middleware
    next();
}
