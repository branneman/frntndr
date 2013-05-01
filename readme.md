# Front-End Bootstrap
This codebase is a blueprint environment to quick start new front-end projects. It contains a [Node.js](http://nodejs.org/) server with [Express](http://expressjs.com/), [EJS](http://embeddedjs.com/), [Sass](http://sass-lang.com/) (scss syntax) and a [Grunt](http://gruntjs.com/) build script which compresses your CSS (via Sass) and JavaScript (with [UglifyJS](http://github.com/mishoo/UglifyJS)) and can run your code through [JSHint](http://www.jshint.com/) and [Jasmine](http://pivotal.github.io/jasmine/).

Setup is *really* easy, there is virtually no learning curve to make these transitions:

- CSS3 to Sass, the scss syntax makes your CSS3 code valid Sass. So you can migrate at your own speed.
- Apache SSI to EJS, peanuts.
- Ant to Grunt, same architecture, but now a modern tool in JSON & JavaScript.
- YUICompressor to Sass & UglifyJS, they do a better job, and you won't have to set it up manually.

*Warning*: I used a lot of conventions I personally prefer you might not agree with! [If you don't like my code, fork off!](http://www.flickr.com/photos/codepo8/5018350616/)

Or use [Yeoman](http://yeoman.io/), a scaffolding tool which could give you the same stack of tools, with more flexibility without the strict rules.

## Development environment

### How to: Setup development environment
Make sure the following is installed on your machine:

- [Node.js](http://nodejs.org/)
- [Ruby](http://www.ruby-lang.org/en/) (shipped with OSX)

When installed, run these commands:

    cd /path/to/project
    gem install sass
    npm install

Done!

### How to: Start the development server

    cd /path/to/project
    node server

Then point your browser to localhost:3000

### How to: Build, test and deploy

    cd /path/to/project
    grunt

To run JSHint & Jasmine:

    grunt test

After the build, to create a zip:

    grunt zip

After the build, to upload to an ftp server (you have to update `config.json` and `.ftppass` first):

    grunt deploy

