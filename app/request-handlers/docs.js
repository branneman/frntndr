/**
 * Documentation request handlers
 */

var fs   = require('fs'),
    path = require('path'),
    swig = require('swig');

module.exports = {

    /**
     * Generates the Documentation Index page
     */
    index: function docsIndexRequestHandler(req, res) {
        // 1. collect a list of modules
        // 2. render: /src/docs/index.html
    },

    /**
     * Generates the Documentation Module page for a single module
     */
    module: function docsModuleRequestHandler(req, res, next) {

        var file = 'src/modules/' + path.basename(req.path);

        if (fs.existsSync(file)) {
            res.render('../src/docs/module.html', {
                name: 'LOLWUT MODULE NAME',
                uri: '../_modules/' + path.basename(req.path)
            });
        } else {
            next();
        }
    },

    /**
     * Generates the content of the module page for a single module
     *  For use inside an <iframe>
     */
    _module: function docsModuleRequestHandler(req, res, next) {

        var file = 'src/modules/' + path.basename(req.path);

        if (fs.existsSync(file)) {
            var content  = fs.readFileSync(file).toString(),
                template = '{% extends \'../docs/_module.html\' %}{% block demo %}' + content + '{% endblock %}',
                html     = swig.render(template, {filename: file});
            res.send(html);
        } else {
            next();
        }
    }

};