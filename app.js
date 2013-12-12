// Load external dependencies
var express = require('express'),
    swig    = require('swig'),
    app     = express();

// Load app dependencies
var config       = require('./config.json'),
    gruntWatcher = require('./app/grunt-watcher'),
    controllers  = require('./app/controllers'),
    reqVariables = require('./app/middleware/req-variables'),
    viewHelpers  = require('./app/middleware/view-helpers');

// Start Grunt watcher, for Sass & Autoprefixer
gruntWatcher();

// App & view configuration
swig.setDefaults({cache: false});
app.engine('.html', swig.renderFile);
app.engine('.js', swig.renderFile);
app.set('views', __dirname + '/src/');
app.set('view engine', 'html');
app.set('view cache', false);

// Set middleware
app.use(express.compress());
app.use(reqVariables(app));
app.use(viewHelpers);

// Set controllers
app.get('/static/img/*.svg.*.png', controllers.svg2png);
app.get('/docs/', controllers.docs.index);
app.get(/\/docs\/modules\/(.*)/, controllers.docs.module);
app.get(/\/docs\/_modules\/(.*)/, controllers.docs._module);
app.get('/static/js/*.js', controllers.concatJS);
app.get('/static/*', controllers.static);
app.use(controllers.views);
app.use(controllers.page404);

// Start server
app.listen(config.server.port);
console.log('Listening on port ' + config.server.port);
console.log('Use Ctrl+C or SIGINT to exit.');
