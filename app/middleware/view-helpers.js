//
// Various view helpers
//

var swig = require('swig');

// Expose module
module.exports = viewHelpers;

// Initialize all view helpers
function viewHelpers(req, res, next) {
    defaultVariables(req, res, next);
}

//
// View Helper:
//  Sets req and baseUrl as a default view variables
//
function defaultVariables(req, res, next) {

    // Set default template variables
    swig.setDefaults({
        locals: {
            req: req,
            baseUrl: req.baseUrl
        }
    });

    // Fall-through to next middleware
    next();
}
