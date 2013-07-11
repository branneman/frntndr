/**
 * View & static file handler
 */

'use strict';

var fs     = require('fs'),
    url    = require('url'),
    config = require('../config.json');

module.exports = function(req, res) {

    var app      = this.app,
        pathname = url.parse(req.url).pathname.substr(1),
        file     = app.get('views') + '/' + (pathname || 'index.html'),
        baseUrl  = new Array(pathname.split('/').length).join('../'),
        viewObj  = { baseUrl: baseUrl, req: req };

    fs.exists(file, function(exists) {
        if (exists) {
            if (file.substr(-5) === '.html') {
                res.render(file, viewObj);
            } else if (file.substr(-3) === '.js') {
                res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
                res.render(file, viewObj);
            } else {
                res.sendfile(file);
            }
        } else {
            res.status(404).render(app.get('views') + config.server.page404, viewObj);
        }
    });
};