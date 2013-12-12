//
// Highlights files with Highlight.js
//

'use strict';

var hljs = require('highlight.js');

// Expose module
module.exports = highlight;

// Map file extension to Highlight.js language
var knownLanguages = {
    html: 'django', // Swig syntax is the same as Django's
    scss: 'scss',
    js:   'javascript'
};

// Highlights the code of a single file
function highlight(extension, code) {

    // Remove docblock
    if (extension === 'html') {
        code = code.replace(/{#([^#}]*)#}\s*/, '');
    }

    if (extension in knownLanguages) {
        var lang = knownLanguages[extension];
        return hljs.highlight(lang, code).value;
    }

    return hljs.highlightAuto(code).value;
}
