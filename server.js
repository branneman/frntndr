var config  = require(__dirname + '/config.json'),
    fs      = require('fs'),
    url     = require('url'),
    exec    = require('child_process').exec,
    express = require('express'),
    ejs     = require('ejs-locals'),
    app     = express();

/**
 * SASS watcher
 */
var sassCwd  = __dirname + '/src/static/',
    sassCmd  = 'sass -t ' + config.server.sassOutputStyle + ' --debug-info --no-cache --watch scss:css',
    sassProc = exec(sassCmd, {cwd: sassCwd}, function(err, stdout, stderr) {});
process.on('SIGINT', function() {
    sassProc.kill();
    process.exit();
});

/**
 * View configuration
 */
app.engine('.html', ejs);
app.engine('.js', ejs);
app.set('views', __dirname + '/src/');
app.set('view engine', 'html');
app.use(express.compress());

/**
 * View & static file handler
 */
app.use(function (req, res) {

    var pathname = url.parse(req.url).pathname.substr(1),
        file     = app.get('views') + '/' + (pathname || 'index.html'),
        baseUrl  = new Array(pathname.split('/').length).join('../'),
        viewObj  = { baseUrl: baseUrl, req: req };

    fs.exists(file, function(exists) {
        if (exists) {
            if (file.substr(-5) === '.html') {
                res.render(file, viewObj);
            } else if (file.substr(-3) === '.js') {
                res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
                res.render(file, viewObj);
            } else {
                res.sendfile(file);
            }
        } else {
            res.status(404).render(app.get('views') + config.server.page404, viewObj);
        }
    });
});

/**
 * Start server
 */
app.listen(config.server.port);
console.log('Listening on port ' + config.server.port);
console.log('Use Ctrl+C or SIGINT to exit.')