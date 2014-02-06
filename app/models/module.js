//
// Module model
//

'use strict';

var path   = require('path');
var glob   = require('glob');
var marked = require('marked');

var FileModel      = require('./file');
var DocblockParser = require('../utils/docblock-parser');
var highlight      = require('../utils/code-highlighter');

// Expose module
module.exports.ModuleModel   = ModuleModel;
module.exports.createModule  = createModule;
module.exports.createModules = createModules;

var maxRecursionDepth = 5;

// Constructor: Module model
function ModuleModel(module) {

    this.file = module.file;
    this.resources = module.resources;

    this.title = module.title;

    // Parse description as Markdown
    if (module.description) {
        this.description = marked(module.description, {highlight: highlight});
    }

    if (module.parent) {
        this.parent = module.parent;
    }

    if (module.children) {
        this.children = module.children;
    }
}

// Tries to create a Module model, when passed a file
function createModule(file, recursionDepth) { // jshint -W071

    // Limit recursion
    if (recursionDepth++ >= maxRecursionDepth) {
        return false;
    }

    var module = {};

    module.file = FileModel.createFile(file);
    if (!module.file) {
        return false;
    }

    // Parse YAML docblock
    var properties = DocblockParser.parse(module.file.contents.raw);
    if (!properties || !properties.title) {
        return false;
    }

    module.title = properties.title;
    module.description = properties.description;

    // Optionally create parent and/or child modules
    module.parent   = _findParent(module, recursionDepth);
    module.children = _findChildren(module, recursionDepth);

    // Create File models for every linked file
    module.resources = FileModel.createFiles(properties.resources);
    module.resources.unshift(module.file);

    return new ModuleModel(module);
}

// Tries to create Module models for all found .html files in a path
function createModules(path, recursionDepth) {

    // Limit recursion
    if (recursionDepth++ >= maxRecursionDepth) {
        return false;
    }

    return glob.sync(path + '/*.html')
        .map(function(file) {
            return createModule(file, recursionDepth);
        })
        .filter(function(module) {
            return module;
        });
}

// Try to find and create a parent module
function _findParent(module, recursionDepth) {
    var file = path.dirname(module.file.path.relative) + '.html';
    return createModule(file, recursionDepth);
}

// Try to find child-modules, and create File models for them
function _findChildren(module, recursionDepth) {
    var dir = 'src/' + module.file.path.relative.match(/(.*)\.[^.]+$/)[1];
    return createModules(dir, recursionDepth);
}
