/**
 * Documentation request handlers
 */

var fs   = require('fs'),
    path = require('path'),
    url  = require('url'),
    glob = require('glob'),
    swig = require('swig'),
    _    = require('underscore');

var PartialParser = require('../partial-parser'),
    highlighter = require('../highlighter');

module.exports = {

    /**
     * Generates the Documentation Index page
     */
    index: function docsIndexRequestHandler(req, res) {

        var pathname = url.parse(req.url).pathname.substr(1),
            baseUrl  = new Array(pathname.split('/').length).join('../'),
            modules  = glob.sync('src/modules/**/*.html').map(function(value) {
                return path.basename(value);
            });

        res.render('../src/docs/index.html', {
            modules: modules,
            baseUrl: baseUrl
        });
    },

    /**
     * Generates the Documentation Module page for a single module
     */
    module: function docsModuleRequestHandler(req, res, next) {

        var file = 'src/modules/' + path.basename(req.path);

        if (!fs.existsSync(file)) {
            return next();
        }

        var source     = fs.readFileSync(file).toString(),
            properties = PartialParser(source);

        properties = properties || {};
        properties.uri = '../_modules/' + path.basename(req.path);

        highlighter(properties);

        var pathname = url.parse(req.url).pathname.substr(1),
            baseUrl  = new Array(pathname.split('/').length).join('../'),
            viewObj  = _.extend({baseUrl: baseUrl}, properties);

        res.render('../src/docs/module.html', viewObj);
    },

    /**
     * Generates the content of the module page for a single module
     *  For use inside an <iframe>
     */
    _module: function docsModuleIframeRequestHandler(req, res, next) {

        var file = 'src/modules/' + path.basename(req.path);

        if (!fs.existsSync(file)) {
            return next();
        }

        var pathname = url.parse(req.url).pathname.substr(1),
            baseUrl  = new Array(pathname.split('/').length).join('../'),
            content  = fs.readFileSync(file).toString(),
            template = '{% extends \'../docs/_module.html\' %}{% block demo %}' + content + '{% endblock %}',
            html     = swig.render(template, {
                filename: file,
                locals: {baseUrl: baseUrl}
            });
        res.send(html);
    }

};
