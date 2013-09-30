# Front-End Library
This codebase is a blueprint environment to quick start new front-end codebases. It tries to save your precious time through having various tools preconfigured and dictating a workflow.

It is based on a local [Node.js](http://nodejs.org/) server, which behaves like Apache. [Sass](http://sass-lang.com/), [Grunt](http://gruntjs.com/), [UglifyJS](http://github.com/mishoo/UglifyJS), [JSHint](http://www.jshint.com/), [imagemin](https://github.com/gruntjs/grunt-contrib-imagemin) and [Jasmine](http://pivotal.github.io/jasmine/) are all integrated.

This preconfigured bag of awesomeness is mostly meant to be used by the experienced who are already familiar with those tools, but should be usable by novices.

## Features
- Setup is *really* easy, you only need to install Node.js, configuration like setting up Apache is not necessary
- The Sass watcher is automatically started, you don't have to worry about it anymore
- [EJS](http://embeddedjs.com/) is used as a template engine where your HTML lives, it's basically JavaScript between these tags: `<% %>`
- Sass with the scss syntax makes your CSS3 code valid Sass. You can start writing Sass at will, or just write CSS3 but still have minification
- Grunt is integrated as the preferred build tool, just run `grunt` in your project root to run the build.
- UglifyJS is used by Grunt to minify your JavaScript
- Jasmine is configured to run as part of the `grunt test` command

*Warning*: I used a lot of conventions I personally prefer you might not agree with! [If you don't like my code, fork off!](http://www.flickr.com/photos/codepo8/5018350616/)

Alternatively you can use [Yeoman](http://yeoman.io/), a great scaffolding tool which could give you the same stack of tools (and more), with more overhead and flexibility, without my strict rules.

## Development environment

### How to: Setup development environment
Make sure the following is installed on your machine:

- [Node.js](http://nodejs.org/), 0.10 or bigger (tested up until 0.10.17)
- [Ruby](http://www.ruby-lang.org/en/) (shipped with OSX)

When installed, run these commands to setup your environment. It will [install Sass](http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#using_sass) and the [grunt cli](https://github.com/gruntjs/grunt-cli) when they're not found. And of course it also installs all the [node dependencies](https://github.com/branneman/frontend-library/blob/master/package.json):

    cd /path/to/project
    npm i

Done!

### How to: Start the development server

    cd /path/to/project
    node server

You can optionally configure your WebStorm to allow for a more easy server start, so you can click a fancy play button instead of having to work on the scary CLI.

Then point your browser to [`http://localhost:1337/`](http://localhost:1337/)

### How to: Build, test and deploy
Make sure your `node server` is running, then execute:

    cd /path/to/project
    grunt

To run JSHint & Jasmine: `grunt test`

*After* the build, to create a zip: `grunt zip`

*After* the build, to upload the build directory to an ftp server (you have to update `config.json` & `.ftppass` first): `grunt deploy`
