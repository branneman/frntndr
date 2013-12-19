//
// File model
//

'use strict';

var fs   = require('fs');
var path = require('path');

var highlight = require('../utils/code-highlighter');

// Expose module
module.exports.FileModel  = FileModel;
module.exports.createFile = createFile;

// File model
function FileModel(file) {

    this.path = {
        pretty:    file.path.pretty,
        extension: file.path.extension,
        absolute:  file.path.absolute,
        relative:  file.path.relative
    };

    this.contents = {
        raw:    file.contents.raw,
        pretty: file.contents.pretty
    };
}

// Tries to create a File model, when passed a (partial) url
function createFile(partialPath) {

    var file = {
        path: {},
        contents: {}
    };

    file.path.absolute = autocompleteFilename(partialPath);
    if (!file.path.absolute) {
        return false;
    }

    file.path.extension = getFileExtension(file.path.absolute);
    file.path.relative  = unixifyPath(path.relative('src/', file.path.absolute));
    file.path.pretty    = getPrettyRelativeFilename(file.path.absolute);

    file.contents.raw    = fs.readFileSync(file.path.absolute).toString();
    file.contents.pretty = highlight(file.contents.raw, file.path.extension);

    return new FileModel(file);
}

// Autocomplete a filename:
//  footer                     ->  src/modules/footer.html
//  footer.html                ->  src/modules/footer.html
//  src/modules/articles.html  ->  src/modules/articles.html
//  modules/footer.scss        ->  src/static/scss/modules/_footer.scss
//  has-js.js                  ->  src/static/js/_has-js.js
//  modules/nav.js             ->  src/static/js/modules/_nav.js
function autocompleteFilename(file) {

    // Optionally remove 'src/' prefix
    if (file.substr(0, 4) === 'src/') {
        file = file.substr(4);
    }

    // Optionally remove 'modules/' prefix
    if (file.substr(0, 8) === 'modules/') {
        file = file.substr(8);
    }

    // Optionally add extension
    var extension = getFileExtension(file);
    if (!extension) {
        extension = 'html';
        file += '.html';
    }

    // Guess possible filenames
    var prefix = __dirname + '/../../src/',
        tests  = [
            prefix + 'modules/' + file,
            prefix + 'modules/' + prefixUnderscoreFilename(file),
            prefix + 'static/' + extension + '/' + file,
            prefix + 'static/' + extension + '/' + prefixUnderscoreFilename(file),
            prefix + 'static/' + extension + '/modules/' + file,
            prefix + 'static/' + extension + '/modules/' + prefixUnderscoreFilename(file)
        ];

    tests = tests.map(function(test) {
        return unixifyPath(path.resolve(test));
    });

    // Return first match
    for (var i = 0; i < tests.length; i++) {
        if (fs.existsSync(tests[i])) {
            return tests[i];
        }
    }
    return false;
}

// Return the extension of a file, without the dot
function getFileExtension(file) {
    var ext = file.match(/\.((?!.*\.).*)/);
    return ext ? ext[1] : false;
}

// Prefix an underscores to a filename:
//  aap.html            ->  _aap.html
//  aap/noot/mies.html  ->  aap/noot/_mies.html
function prefixUnderscoreFilename(file) {
    if (-1 !== file.indexOf('/')) {
        return file.replace(/\/(?!.*\/)/g, '/_');
    }
    return '_' + file;
}

// Returns a relative (to src/) path with the filename wrapped with a <span>
//  src\aap.html       ->  <span class="file">aap.html</span>
//  src\aap\noot.html  ->  aap/<span class="file">noot.html</span>
function getPrettyRelativeFilename(file) {

    file = path.relative('src/', file);
    file = unixifyPath(file);
    file = file.replace(/\/((?!.*\/).*)/g, '/<span class="file">$1</span>');

    return file;
}

// Returns a path with UNIX slashes
//  aap\noot\mies.html  ->  aap/noot/mies.html
function unixifyPath(file) {
    return file.replace(/\\/g, '/');
}
