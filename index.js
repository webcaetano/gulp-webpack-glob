'use strict';
var through = require('through2');
var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var glob = require('glob');

var getCard = function(mid){
	return new RegExp('import[*|\\w|\\s]+\''+mid+'\'|import[*|\\w|\\s]+\"'+mid+'\"','g');
}

var escapeRegExp = function(str) { // credits CoolAJ86
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}


module.exports = function (options) {
	return through.obj(function (file, enc, callback) {
		if (file.isNull()) return callback(null, file);
		var content = String(file.contents);
		var fileDir = path.dirname(path.resolve(file.path));
		var i;
		var modules = [];
		var vars = {};

		modules = _.compact(modules.concat(content.match(getCard('[a-zA-Z_\\-\\.\\/\\*]+'))));

		for(i in modules){
			var tmpVar = modules[i].match(/import\s+\*\s+from/g);
			if(tmpVar && tmpVar.length) vars[i]=tmpVar[0];
			modules[i] = modules[i].match(/['"][a-zA-Z_\-\.\/\*]+['"]/g)[0];
			modules[i] = modules[i].substr(1,modules[i].length-2);
		}
		modules = _.uniq(modules);

		for(i in modules){
			if(modules[i].indexOf('*')==-1) continue;
			var replaceModules = [];
			var globModules = glob.sync(path.join(fileDir,modules[i]));
			for(var k in globModules){
				var pathRelative = path.relative(fileDir,globModules[k]).replace(/\\/g,'/');
				if(!vars[i]){
					replaceModules.push('import "'+pathRelative+'"');
				} else {
					replaceModules.push(vars[i].replace(/\*/g,path.basename(pathRelative,path.extname(pathRelative)))+' "'+pathRelative+'"');
				}
			}

			content = content.replace(getCard(escapeRegExp(modules[i])),replaceModules.join(';\n'));
		}
		file.contents = new Buffer(content);
		callback(null,file);
	});
};
