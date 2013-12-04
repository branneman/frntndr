/**
 * Parses a Swig comment block with variables
 */

module.exports = {

    _properties: ['title', 'description', 'js', 'css'],

    parse: function (html) {
        var result = html.match(new RegExp('{#[ \r\n\t]*(([^\-]|[\r\n]|-[^\-])*[ \r\n\t]*)#}'));
        if (!result || !result[0]) {
            return null;
        }
        return this._getProperties(result[0]);
    },

    _getProperties: function (str) {

        var result = {},
            i = 0,
            value = null,
            property = null,
            foundProperty = null,
            c;

        while (c = str.charAt(i)) {

            if (c === '$') {

                foundProperty = this._getProperty(str, i);
                if (foundProperty) {

                    if (property) {
                        result[property] = value.trim();
                    }

                    property = foundProperty;
                    value = '';
                    i += property.length + 2;
                    continue;
                }

            }

            if (property) {
                value += c;
            }

            i++;
        }

        if (value.length) {
            result[property] = value.trim();
        }

        return result;
    },

    _getProperty: function (str, index) {
        var i = 0,
            l = this._properties.length;
        for (; i < l; i++) {
            if (str.indexOf('$' + this._properties[i] + ':') === index) {
                return this._properties[i];
            }
        }
        return null;
    }

};