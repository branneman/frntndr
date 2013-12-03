module.exports = {
    svg2png:  require('./request-handlers/svg2png'),
    docs:     require('./request-handlers/docs'),
    concatJS: require('./request-handlers/concat-js'),
    static:   require('./request-handlers/static'),
    views:    require('./request-handlers/views'),
    page404:  require('./request-handlers/page404')
};