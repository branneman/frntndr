var express = require('express'),
    engine  = require('ejs-locals'),
    fs      = require('fs'),
    config  = require(__dirname + '/config.json'),
    url     = require('url'),
    exec    = require('child_process').exec,
    app     = express();

/**
 * SASS handler
 */
var sassCwd  = __dirname + '/src/static/',
    sassCmd  = 'sass -t ' + config.sass.outputStyle + ' --no-cache --watch scss:css',
    sassProc = exec(sassCmd, {cwd: sassCwd}, function(err, stdout, stderr) {});
process.on('SIGINT', function() {
    sassProc.kill();
    process.exit();
});

/**
 * JavaScript handler
 */
app.get('/static/js/all.js', function(req, res) {
    var files = JSON.parse(fs.readFileSync(__dirname + '/src/static/js/all.json')).files,
        combined = '';
    for (var i = 0; i < files.length; i++) {
        combined += fs.readFileSync(__dirname + '/src/static/js/' + files[i]); // 'utf8'
    }
    res.setHeader('Content-Type', 'text/javascript');
    res.send(combined);
});

/**
 * HTML handler
 */
app.engine('.html', engine);
app.set('views', __dirname + '/src/views/pages');
app.set('view engine', 'html');
app.use(function(req, res) {
    var url = req.url.substr(1) || 'index',
        file = __dirname + '/src/views/pages/' + url + (url.substr(-5) !== '.html' ? '.html' : '');
    fs.exists(file, function(exists) {
        res.render(exists ? url : '404', {
            baseUrl: (new Array(url.split('/').length)).join('../')
        });
    });
});

/**
 * Static file handler
 */
app.use('/static', express.static(__dirname + '/src/static'));

/**
 * 404 handler
 */
// .. todo ..

/**
 * Start server
 */
console.log('Listening on port ' + config.server.port);
console.log('Use CTRL + C to exit.');
app.listen(config.server.port);