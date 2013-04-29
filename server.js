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
 * View & static file handler
 */
app.engine('.html', ejs);
app.set('views', __dirname + '/src/');
app.set('view engine', 'html');
app.use(function (req, res) {

    var pathname = url.parse(req.url).pathname.substr(1),
        file     = app.get('views') + '/' + (pathname || 'index.html'),
        baseUrl  = new Array(pathname.split('/').length).join('../'),
        viewObj  = { baseUrl: baseUrl, req: req };

    fs.exists(file, function(exists) {
        if (exists) {
            if (file.substr(-5) === '.html') {
                res.render(file, viewObj);
            } else {
                res.sendfile(file);
            }
        } else {
            res.status(404).render(app.get('views') + config.page404, viewObj);
        }
    });
});

/**
 * Start server
 */
app.listen(config.server.port);
console.log('Listening on port ' + config.server.port);
console.log('Use Ctrl+C or SIGINT to exit.');