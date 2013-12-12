//
// Sets common variables to the request object
//

var url = require('url');

// Expose module
module.exports = setRequestVariables;

// Function to 'save' the app variable to this scope
function setRequestVariables(app) {

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
