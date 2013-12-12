//
// Highlights files with Highlight.js
//

var hljs = require('highlight.js');

// Expose module
module.exports = highlight;

// List of supported languages by Highlight.js
var knownLanguages = ['html', 'scss', 'js'];

// Highlights the code of a single file
function highlight(extension, code) {

    if (extension === 'html') {
        code = code.replace(/{#([^#}]*)#}\s*/, '')
    }

    if (knownLanguages.indexOf(extension) !== -1) {
        var lang = getHighlightJSLanguage(extension);
        return hljs.highlight(lang, code).value;
    }

    return hljs.highlightAuto(code).value;
}

// Converts known languages to a Highlight.js language identifier
function getHighlightJSLanguage(lang) {

    var map = {
        html: 'django', // Swig syntax is the same as Django's
        js: 'javascript'
    };

    if (map[lang]) {
        return map[lang];
    }
    return lang;
}
