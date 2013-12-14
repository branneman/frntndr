//
// Sets common variables to the request object
//

'use strict';

var url = require('url');

// Expose module
module.exports = setRequestVariablesFactory;

// Function to 'catch' the `app` variable in a scope
function setRequestVariablesFactory(app) {

    // This function is executed for every request
    return function setRequestVariables(req, res, next) {

        // Set global app variable to the request
        req.app = app;

        // Set base url as request parameter, for other
        var pathname = url.parse(req.url).pathname.substr(1);
        var baseUrl  = new Array(pathname.split('/').length).join('../');
        req.baseUrl = baseUrl;

        // Fall-through to next middleware
        next();
    };
}
