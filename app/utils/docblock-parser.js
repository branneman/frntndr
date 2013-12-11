/**
 * Parses a Swig comment block with variables and returns the result
 * @returns object | false
 */
module.exports.parse = function(source) {

    var docblock = getDocBlock(source);
    if (!docblock) return false;

    var properties = getProperties(docblock);
    if (!properties) return false;

    return properties;

};

/**
 * Allowed properties
 */
var allowedProperties = ['title', 'description', 'parent'],
    allowedFiles      = ['html', 'js', 'scss'];

/**
 * Grabs the contents of a Swig comment block, delimited with: {# and #}
 * @returns string | false
 */
var getDocBlock = function(source) {
    var result = source.match(/{#([^#}]*)#}/);
    return (result && result[1] ? result[1] : false);
};

/**
 * Parse a multiline string for $key:value pairs
 * @returns object | false
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
