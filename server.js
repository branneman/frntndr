var express = require('express'),
    engine  = require('ejs-locals'),
    fs      = require('fs'),
    config  = require(__dirname + '/server-config.json'),
    sass    = require('node-sass'),
    app     = express();

// Set and configure EJS template engine
app.engine('.html', engine);
app.set('views', __dirname + '/src/views/pages');
app.set('view engine', 'html');

// Serve compiled sass as css
/*app.get('/static/css/all.css', function(req, res) {
    var scss = fs.readFileSync(__dirname + '/src/static/css/all.scss');
    sass.render(scss, function(err, css) {
        if (!err) {
            res.setHeader('Content-Type', 'text/css');
            res.send(css);
        } else {
            res.send('[node-sass] ' + err);
        }
    }, {
        includePaths: [__dirname + '/src/static/css/'],
        outputStyle: 'compressed'
    });
});*/

// Serve compiled sass as css
app.use(sass.middleware({
    src:  __dirname + '/src/',
    dest: __dirname + '/src/'
}));

// Serve combined .js file
app.get('/static/js/all.js', function(req, res) {
    var files = require(__dirname + '/src/static/js/all.json').files,
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
    var url  = req.url.substr(1) || 'index',
        file = __dirname + '/src/views/pages/' + url + (url.substr(-5) !== '.html' ? '.html' : '');
    fs.exists(file, function(exists) {
        if (!exists) {
            url = '404';
        }
        res.render(url, {
            'url': req.url
        });
    });
});

app.listen(config.port);