//
// Module model
//

'use strict';

var marked = require('marked');

var FileModel      = require('./file');
var DocblockParser = require('../utils/docblock-parser');
var highlight      = require('../utils/code-highlighter');

// Expose module
module.exports.ModuleModel  = ModuleModel;
module.exports.createModule = createModule;

// Constructor: Module model
function ModuleModel(module) {

    this.file = module.file;
    this.files = module.files;

    this.title = module.title;
    this.description = module.description;
}

// Tries to create a Module model, when passed a file
function createModule(file) {

    var module = {};

    module.file = FileModel.createFile(file);
    if (!module.file) {
        return false;
    }

    // Parse YAML docblock, if available
    var properties = DocblockParser.parse(module.file.contents.raw);
    if (!properties || !properties.title) {
        return false;
    }

    module.title = properties.title;

    // Parse description as Markdown
    if (properties.description) {
        module.description = marked(properties.description, {highlight: highlight});
    }

    // @todo Optionally define a parent

    // Create File models for every linked file
    module.files = properties.files
        .map(function(file) {
            return FileModel.createFile(file);
        })
        .filter(function(file) {
            return file;
        });

    module.files.unshift(module.file);

    return new ModuleModel(module);
}
