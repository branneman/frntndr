// Load external dependencies
var express   = require('express'),
    tplEngine = require('ejs-locals'),
    app       = express();

// Load app dependencies
var config          = require('./config.json'),
    gruntWatcher    = require('./app/grunt-watcher'),
    requestHandlers = require('./app/request-handlers');

// Start Grunt watcher, for Sass & Autoprefixer
gruntWatcher();

// App & view configuration
app.engine('.html', tplEngine);
app.engine('.js', tplEngine);
app.set('views', __dirname + '/src/');
app.set('view engine', 'html');
app.use(express.compress());

// Bind request handles
app.get('/static/img/*.svg.*.png', requestHandlers.svg2png);
//app.get('/docs/*.html', requestHandlers.docs);
app.use(requestHandlers.views.bind({app: app}));

// Start server
app.listen(config.server.port);
console.log('Listening on port ' + config.server.port);
console.log('Use Ctrl+C or SIGINT to exit.');
