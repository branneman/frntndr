/**
 * Returns true if there's a Swig comment block with variables present
 */
module.exports.hasDocBlock = function(source) {
    return !! getDocBlock(source);
};

/**
 * Parses a Swig comment block with variables
 */
module.exports.parse = function(source) {

    var docblock = getDocBlock(source);
    if (!docblock) return false;

    var properties = getProperties(docblock);
    if (!properties) return false;

    return properties;

};

var allowedProperties = ['title', 'description', 'parent'],
    allowedFiles      = ['html', 'js', 'scss'];

/**
 * Returns the contents of a Swig comment block, delimited with: {# and #}
 */
var getDocBlock = function(source) {
    var result = source.match(/{#([^#}]*)#}/);
    return (result && result[1] ? result[1] : false);
};

/**
 * Returns a properties object
 */
var getProperties = function(docblock) {

    var result = docblock.match(/(\$.*:.*[^\s])/g);
    if (!result || !result.length) {
        return false;
    }

    var properties = {files: []};
    result.forEach(function(line) {

        var property = {
            lang: line.match(/\$([^:\s]+)/)[1],
            file: line.match(/:\s*(.*)/)[1]
        };

        if (allowedProperties.indexOf(property.lang) !== -1) {
            properties[property.lang] = property.file;
        }

        if (allowedFiles.indexOf(property.lang) !== -1) {
            properties.files.push(property);
        }
    });

    return properties;
};
