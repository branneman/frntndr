/**
 * Highlights files with Highlight.js
 */

var fs   = require('fs'),
    path = require('path'),
    hljs = require('highlight.js');

// Highlight.js configuration
hljs.tabReplace = '    ';

/**
 * Augments the properties.files array with highlighted code and paths
 */
module.exports = function(properties) {

    if (!properties.files) return;

    properties.files.forEach(function(file, index) {

        if (supportedLanguages.indexOf(file.lang) === -1) {
            return;
        }

        var filename = correctFilename(file.lang, file.file);
        if (filename) {

            var code   = fs.readFileSync(filename).toString(),
                langID = getHighlightJSLanguage(file.lang);

            properties.files[index].filename = {
                relative: getPrettyRelativeFilename(filename),
                absolute: getPrettyAbsoluteFilename(filename)
            };
            properties.files[index].lang = getPrettyLanguage(file.lang);
            properties.files[index].code = hljs.highlight(langID, code).value;
        }
    });
};

/**
 * List of supported languages by Highlight.js
 */
var supportedLanguages = ['html', 'scss', 'js'];

/**
 * Correct a filename:
 *  html & articles     ->  src/articles.html
 *  scss & modules/nav  ->  src/static/scss/modules/_nav.scss
 *  js   & docs         ->  src/static/js/docs.js
 *  js   & modules/nav  ->  src/static/js/modules/_nav.js
  */
var correctFilename = function(lang, fileID) {

    // Determine possible filenames
    var prefix = __dirname + '/../src/',
        file   = fileID + '.' + lang,
        tests  = [
            prefix + file,
            prefix + underscoreFilename(file),
            prefix + lang + '/' + file,
            prefix + lang + '/' + underscoreFilename(file),
            prefix + 'static/' + lang + '/' + file,
            prefix + 'static/' + lang + '/' + underscoreFilename(file)
        ];
    tests = tests.map(function(test) {
        return path.resolve(test);
    });

    // Return first match
    for (var i = 0; i < tests.length; i++) {
        if (fs.existsSync(tests[i])) {
            return tests[i];
        }
    }
    return false;
};

/**
 * Underscores a filename:
 *  aap            ->  _aap
 *  aap/noot/mies  ->  aap/noot/_mies
 */
var underscoreFilename = function(file) {
    if (-1 !== file.indexOf('/')) {
        return file.replace(/\/(?!.*\/)/g, '/_');
    }
    return '_' + file;
};

/**
 * Converts known languages to a Highlight.js language identifier
 */
var getHighlightJSLanguage = function(lang) {

    var map = {
        html: 'django',
        js: 'javascript'
    };

    if (map[lang]) {
        return map[lang];
    }
    return lang;
};

/**
 * Returns a relative path with unix slashes, and the filename wrapped with a <span>
 */
var getPrettyRelativeFilename = function(file) {
    return path.relative(__dirname + '/../src/', file)
        .replace(/\\/g, '/')
        .replace(/\/((?!.*\/).*)/g, '/<span class="file">$1</span>');
};

/**
 * Returns an absolute path with unix slashes
 */
var getPrettyAbsoluteFilename = function(file) {
    return file.replace(/\\/g, '/');
};

/**
 * Converts known languages to a human readable language
 */
var getPrettyLanguage = function(lang) {

    var map = {
        html: 'HTML',
        scss: 'SCSS',
        js: 'JavaScript'
    };

    // Return from map
    if (map[lang]) return map[lang];

    // Not found? Uppercase the first letter
    return lang.charAt(0).toUpperCase() + lang.slice(1);
};
