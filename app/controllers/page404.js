//
// Page 404 Controller
//

var url  = require('url');
var ansi = require('ansi-styles');

var config = require('../../config.json');

// Expose module
module.exports = page404;

// Render 404 page from config
function page404(req, res) {

    // Log 404 page url
    var pathname = url.parse(req.url).pathname.substr(1);
    console.log(ansi.red.open + '404 Not Found: /' + pathname + ansi.red.close);

    res.status(404).render(req.app.get('views') + config.server.page404);

}
