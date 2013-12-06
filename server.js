// Load external dependencies
var express = require('express'),
    swig    = require('swig'),
    app     = express();

// Load app dependencies
var config          = require('./config.json'),
    gruntWatcher    = require('./app/grunt-watcher'),
    requestHandlers = require('./app/request-handlers');

// Start Grunt watcher, for Sass & Autoprefixer
gruntWatcher();

// App & view configuration
swig.setDefaults({cache: false});
app.engine('.html', swig.renderFile);
app.engine('.js', swig.renderFile);
app.set('views', __dirname + '/src/');
app.set('view engine', 'html');
app.set('view cache', false);
app.use(express.compress());
app.use(function(req, res, next) { req.app = app; next(); });

// Set request handlers with Express
app.get('/static/img/*.svg.*.png', requestHandlers.svg2png);
app.get('/docs/', requestHandlers.docs.index);
app.get(/\/docs\/modules\/(.*)/, requestHandlers.docs.module);
app.get(/\/docs\/_modules\/(.*)/, requestHandlers.docs._module);
app.get('/static/js/*.js', requestHandlers.concatJS);
app.get('/static/*', requestHandlers.static);
app.use(requestHandlers.views);
app.use(requestHandlers.page404);

// Start server
app.listen(config.server.port);
console.log('Listening on port ' + config.server.port);
console.log('Use Ctrl+C or SIGINT to exit.');
