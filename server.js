var express = require('express'),
    engine  = require('ejs-locals'),
    fs      = require('fs'),
    config  = require(__dirname + '/config.json'),
    sass    = require('node-sass'),
    app     = express();

// Set and configure EJS template engine
app.engine('.html', engine);
app.set('views', __dirname + '/src/views/pages');
app.set('view engine', 'html');

// Serve compiled sass as css
app.get('/static/css/all.css', function(req, res) {
    var scss = fs.readFileSync(__dirname + '/src/static/css/all.scss');
    sass.render(scss, function(err, css) {
        res.setHeader('Content-Type', 'text/css');
        res.send(err ? err : css);
    });
});

// Serve combined .js file
app.get('/static/js/all.js', function(req, res) {
    var files = JSON.parse(fs.readFileSync(__dirname + '/src/static/js/all.json')).files,
        combined = '';
    for (var i = 0; i < files.length; i++) {
        combined += fs.readFileSync(__dirname + '/src/static/js/' + files[i]); // 'utf8'
    }
    res.setHeader('Content-Type', 'text/javascript');
    res.send(combined);
});

// Serve all URL's starting with /static from the /src/static directory
app.use('/static', express.static(__dirname + '/src/static'));

// Serve .html files
app.use(function(req, res) {
    var url = req.url.substr(1) || 'index',
        file = __dirname + '/src/views/pages/' + url + (url.substr(-5) !== '.html' ? '.html' : '');
    fs.exists(file, function(exists) {
        if (exists) {
            res.render(url);
        } else {
            res.render('404');
            res.send(404);
        }
    });
});

// Listen for requests
console.log('Listening on port ' + config.server.port);
app.listen(config.server.port);