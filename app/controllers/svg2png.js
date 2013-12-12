//
// svg2png controller - Serves generated PNG from SVG
//  generates 'checkmark.svg.107x94.png' from 'checkmark.svg' with Inkscape CLI
//

var fs   = require('fs');
var exec = require('child_process').exec;

var config = require('../../config.json');

// Expose module
module.exports = svg2pngRequestHandler;

// Generate PNG from SVG and send it
function svg2pngRequestHandler(req, res, next) {

    var pngFile = 'src' + req.url;
    var svgFile = pngFile.substring(0, pngFile.indexOf('.svg') + 4);

    // Send PNG file to client when it's cached on disk
    if (fs.existsSync(pngFile)) {
        return res.sendfile(pngFile);
    }

    // Generate PNG and send to client
    if (fs.existsSync(svgFile)) {
        var size = pngFile.split('.')[pngFile.split('.').length - 2].split('x');
        var cmd  = '"' + config.svg.pathToInkscape + '" -z -e "' + pngFile + '" -w ' + size[0] + ' -h ' + size[1] + ' "' + svgFile + '"';

        // Generate PNG from SVG with inkscape, and send the file to the browser when ready.
        exec(cmd, function(err, stdout) {
            if (err) throw err;
            res.sendfile(pngFile);
        });
    }

}
