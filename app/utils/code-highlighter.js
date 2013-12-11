/**
 * Highlights files with Highlight.js
 */

var hljs = require('highlight.js');

/**
 * Highlights the code of a single file
 */
module.exports = function(extension, code) {

    if (extension === 'html') {
        code = code.replace(/{#([^#}]*)#}\s*/, '')
    }

    if (knownLanguages.indexOf(extension) !== -1) {
        var lang = getHighlightJSLanguage(extension);
        return hljs.highlight(lang, code).value;
    }

    return hljs.highlightAuto(code).value;
};

/**
 * List of supported languages by Highlight.js
 */
var knownLanguages = ['html', 'scss', 'js'];

/**
 * Converts known languages to a Highlight.js language identifier
 */
var getHighlightJSLanguage = function(lang) {

    var map = {
        html: 'django', // Swig syntax is the same as Django's
        js: 'javascript'
    };

    if (map[lang]) {
        return map[lang];
    }
    return lang;
};
