//
// Parses a Swig comment block with variables and returns the result
//

'use strict';

var _    = require('lodash');
var yaml = require('js-yaml');

// Expose module
module.exports.parse = parse;

// Allowed properties
var allowedProperties = ['title', 'description'],
    allowedResources  = ['html', 'js', 'scss'];

// Parse swig comment block - control function
function parse(source) {

    var docblock = getDocBlock(source);
    if (!docblock) return false;

    var properties = getProperties(docblock);
    if (!properties) return false;

    return properties;
}

// Grabs the contents of a Swig comment block, delimited with: {# and #}
function getDocBlock(source) {
    var result = source.match(/{#([^#}]*)#}/);
    return (result && result[1] ? result[1] : false);
}

// Parse the YAML block into an object
function getProperties(docblock) {

    var yamlProperties = yaml.safeLoad(docblock);
    var properties     = {resources: []};

    // Iterate over all properties
    Object.keys(yamlProperties).forEach(function(key) {

        var val = yamlProperties[key];

        // Handle Properties (title, description, ...)
        if (allowedProperties.indexOf(key) !== -1) {
            properties[key] = val;
        }

        // Handle Resources
        if (key === 'resources') {

            Object.keys(val).forEach(function(key) {
                var ext = key;

                // Add multiple resources for this filetype
                if (_.isArray(val[key])) {
                    val[key].forEach(function(key) {
                        properties.resources.push(key + '.' + ext);
                    });
                    return;
                }

                // Add a single resource for this filetype
                if (allowedResources.indexOf(key) !== -1) {
                    properties.resources.push(val[key] + '.' + key);
                }
            });
        }
    });

    return properties;
}
