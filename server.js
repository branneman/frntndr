// Load external dependencies
var express   = require('express'),
    tplEngine = require('ejs-locals'),
    app       = express();

// Load app dependencies
var config         = require('./config.json'),
    sassWatcher    = require('./app/sass-watcher'),
    svg2pngHandler = require('./app/svg2png-handler'),
    viewHandler    = require('./app/view-handler').bind({app: app});

// Start Sass watcher
sassWatcher();

// App & view configuration
express.static.mime.define({'text/plain': ['map']}); // source maps don't have a mimetype yet
app.engine('.html', tplEngine);
app.engine('.js', tplEngine);
app.set('views', __dirname + '/src/');
app.set('view engine', 'html');
app.use(express.compress());

// Serve generated PNG from SVG
app.get('/static/img/*.svg.*.png', svg2pngHandler);

// View & static file handler
app.use(viewHandler);

// Start server
app.listen(config.server.port);
console.log('Listening on port ' + config.server.port);
console.log('Use Ctrl+C or SIGINT to exit.');
