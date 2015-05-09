'use strict';
var webpackGlob = require('./');
var through = require('through2');
var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var glob = require('glob');

describe('gulp-webpack-glob', function() {

	it('should read glob and output all files', function(done) {
		gulp.src('test/test1/index.js')
		.pipe(webpackGlob())
		.pipe(through.obj(function (file, enc, callback) {
			var content = String(file.contents);
			var globs = glob.sync('test/test1/lib/*.js')
			var fileDir = path.dirname(path.resolve(file.path));

			var c = 0;
			for(var i in globs) {
				var pathRelative = path.relative(fileDir,globs[i]).replace(/\\/g,'/');
				if(content.indexOf(pathRelative)!=-1) ++c;
			}

			expect(content).to.exist;
			expect(globs.length).to.be.equals(c);
			done();
		}));
	});

	it('should read glob and output all files with var as filename', function(done) {
		gulp.src('test/test2/index.js')
		.pipe(webpackGlob())
		.pipe(through.obj(function (file, enc, callback) {
			var content = String(file.contents);
			var globs = glob.sync('test/test2/lib/*.js')
			var fileDir = path.dirname(path.resolve(file.path));

			var c = 0;
			for(var i in globs) {
				var filename = path.basename(globs[i],path.extname(globs[i]));
				var matchs = content.match(new RegExp('import\\s+'+filename+'\\s+from','g'))
				if(matchs && matchs.length) ++c;
			}

			expect(content).to.exist;
			expect(globs.length).to.be.equals(c);
			done();
		}));
	});
});
