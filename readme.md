# Front-End Bootstrap
This codebase is a blueprint environment to quick start new front-end projects. It contains a [Node.js](http://nodejs.org/) server with [Express](http://expressjs.com/), [EJS](http://embeddedjs.com/), [Sass](http://sass-lang.com/) (scss syntax) and a [Grunt](http://gruntjs.com/) build script.

Setup is *really* easy, and there is virtually no learning curve when you're coming from Apache SSI and/or Ant build scripts for example. Node.js, EJS and Sass all have a very gentle learning curve.

*Warning*: I used a lot of conventions I personally prefer you might not agree! [If you don't like my code, fork off!](http://www.flickr.com/photos/codepo8/5018350616/)

## Development environment

### How to: Start the development server

    cd /path/to/project
    node server

Then point your browser to localhost:3000

### How to: Build

    cd /path/to/project
    grunt

To run the Jasmine specs through PhantomJS:

    grunt test

After the build, to create a zip:

    grunt zip

After the build, to upload to an ftp server:

    grunt deploy

### How to: Setup development environment
Make sure the following is installed on your machine:

- [Node.js](http://nodejs.org/)
- [Ruby](http://www.ruby-lang.org/en/) (shipped with OSX)

When installed, run these commands:

    cd /path/to/project
    gem install sass
    npm install

Done!
