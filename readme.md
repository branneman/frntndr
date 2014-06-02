# frntndr
**See [frntndr.com](http://frntndr.com/) for more documentation**.

This codebase is an **_opinionated_** blueprint environment to quick start new front-end codebases. It tries to save you some precious time through having various tools preconfigured and dictating a workflow.

It is based on a local [Node.js](http://nodejs.org/) server, which behaves like Apache. [Grunt](http://gruntjs.com/), [Sass](http://sass-lang.com/), [Autoprefixer](https://github.com/ai/autoprefixer), [CSSO](http://css.github.io/csso/), [UglifyJS](http://github.com/mishoo/UglifyJS), [JSHint](http://www.jshint.com/), [scss-lint](https://github.com/causes/scss-lint), [imagemin](https://github.com/gruntjs/grunt-contrib-imagemin) and more are included.

**Warning**: I used a lot of conventions I personally prefer, which you might not agree with! Alternatively you can use [Yeoman](http://yeoman.io/), a great scaffolding tool which could give you the same stack of
tools (and more), with more overhead and flexibility, without my strict rules.

## Features
- Setup is *really* easy, you only need to install Node.js, configuration like setting up Apache is not necessary.
- [Swig](http://paularmstrong.github.io/swig/) is used as a template engine where your HTML lives.
- Sass with the scss syntax makes your CSS3 code valid Sass. You can start writing Sass at will, or just write CSS3 but still have minification.
- Sass is automatically compiled and then ran through Autoprefixer. The watcher is automatically started, you don't have to worry about it anymore.
- Grunt is integrated as the preferred build tool, just run `grunt` in your project root to run the build.
- UglifyJS is used by Grunt to minify your JavaScript.
- Images are minified on build with imagemin.

## Development environment

### How to: Setup development environment
1. Make sure the following is installed on your machine:
  - [Node.js](http://nodejs.org/), 0.10 or bigger (tested up until 0.11.12)
  - [Ruby](http://www.ruby-lang.org/en/) (shipped with OSX)
2. Download most recent stable: [github.com/branneman/frntndr/archive/0.4.zip](https://github.com/branneman/frntndr/archive/0.4.zip)
3. Unzip the contents of the `frntndr-0.4` directory into your new project directory.
4. Run these commands to install the global dependencies:

    ```
    npm install -g grunt-cli bower
    gem install bundle
    ```
5. Run these commands to install the project-specific dependencies:

	```
	cd /path/to/project
	npm install
	bundle install
    bower install
	```
6. You might want to update your `package.json` with the correct project name, repository and license.
7. Done! You can now start your development server.

### How to: Start the development server

    cd /path/to/project
    node app

Then point your browser to [`http://localhost:1337/`](http://localhost:1337/)

### How to: Build, test and deploy
- Make sure your app is running, then execute:

	```
	grunt
	```

    The resulting build files can be found inside the `build/` directory.

- To run scss-lint and JSHint:

	```
	grunt test
	```

- *After* the build, to create a zip:

	```
	grunt zip
	```

- *After* the build, to upload the build directory to an ftp server (you have to update `config.json` & `.ftppass` first):

	```
	grunt deploy
	```
