//
// Module model
//

'use strict';

var FileModel      = require('./file');
var DocblockParser = require('../utils/docblock-parser');

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

    var properties = DocblockParser.parse(module.file.contents.raw);
    if (!properties || !properties.title) {
        return false;
    }

    module.title = properties.title;
    if (properties.description) {
        module.description = properties.description;
    }

    // @todo Optionally define a parent

    // Create File models for every linked file
    module.files = properties.files
        .map(function(linkedFile) {
            var filename = linkedFile.file + '.' + linkedFile.lang;
            return FileModel.createFile(filename);
        })
        .filter(function(linkedFile) {
            return linkedFile;
        });

    module.files.unshift(module.file);

    return new ModuleModel(module);
}
