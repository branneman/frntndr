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
    sassCmd  = 'sass -t ' + config.server.sassOutputStyle + ' --sourcemap --no-cache --watch scss:css',
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
 * Serve generated PNG from SVG
 *  generates 'checkmark.svg.107x94.png' from 'checkmark.svg' with Inkscape CLI
 */
app.get('/static/img/*.svg.*.png', function(req, res) {
    var pngFile = 'src' + req.url,
        svgFile = pngFile.substring(0, pngFile.indexOf('.svg') + 4);
    if (!fs.existsSync(svgFile)) {
        return res.render('404', {
            baseUrl: (new Array(req.url.split('/').length)).join('../')
        });
    }
    if (fs.existsSync(pngFile)) {
        return res.sendfile(pngFile);
    }
    var size = pngFile.split('.')[pngFile.split('.').length - 2].split('x'),
        cmd  = '"' + config.svg.pathToInkscape + '" -z -e "' + pngFile + '" -w ' + size[0] + ' -h ' + size[1] + ' "' + svgFile + '"';
    exec(cmd, function(err, stdout) {
        if (err) throw err;
        res.sendfile(pngFile);
    });
});

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