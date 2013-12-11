//
// Documentation Controller
//

var glob = require('glob');
var swig = require('swig');

var FileModel   = require('../models/file');
var ModuleModel = require('../models/module');

// Expose module
module.exports.index   = indexAction;
module.exports.module  = moduleAction;
module.exports._module = framedModuleAction;

//
// Renders the Documentation Index page
//
function indexAction(req, res) {

    // Grab all .html files with a docblock and create Modules
    var modules = glob.sync('src/modules/**/*.html')
        .map(function(file) {
            return ModuleModel.createModule(file);
        })
        .filter(function(module) {
            return module;
        });

    res.render('docs/index.html', {
        modules: modules
    });
};

//
// Renders the Documentation Module page for a single module
//
function moduleAction(req, res, next) {

    var module = ModuleModel.createModule(req.params[0]);
    if (!module) {
        return next();
    }

    res.render('docs/module.html', {
        module: module
    });
};

//
// Renders the content of the module page for a single module
//  For use inside an <iframe>
//
function framedModuleAction(req, res, next) {

    var file = FileModel.createFile(req.params[0]);
    if (!file) {
        return next();
    }

    var template =
        '{% extends \'framed.html\' %}' +
        '{% block demo %}' +
            file.contents.raw +
        '{% endblock %}';

    var html = swig.render(template, {
        filename: 'src/layout/docs/fake.html'
    });

    res.send(html);
};
