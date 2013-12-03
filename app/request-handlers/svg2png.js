/**
 * svg2png request handler - Serves generated PNG from SVG
 *  generates 'checkmark.svg.107x94.png' from 'checkmark.svg' with Inkscape CLI
 */

var exec   = require('child_process').exec,
    fs     = require('fs'),
    config = require('../../config.json');

module.exports = function svg2pngRequestHandler(req, res) {

    var pngFile = 'src' + req.url,
        svgFile = pngFile.substring(0, pngFile.indexOf('.svg') + 4);

    // Send 404 to client whenever the svg is missing
    if (!fs.existsSync(svgFile)) {
        return res.render('404', {
            baseUrl: (new Array(req.url.split('/').length)).join('../')
        });
    }

    // Send file to client when it's cached on disk
    if (fs.existsSync(pngFile)) {
        return res.sendfile(pngFile);
    }

    var size = pngFile.split('.')[pngFile.split('.').length - 2].split('x'),
        cmd  = '"' + config.svg.pathToInkscape + '" -z -e "' + pngFile + '" -w ' + size[0] + ' -h ' + size[1] + ' "' + svgFile + '"';

    // Generate PNG from SVG with inkscape, and send the file to the browser when ready.
    exec(cmd, function(err, stdout) {
        if (err) throw err;
        res.sendfile(pngFile);
    });

};