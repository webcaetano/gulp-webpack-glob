module.exports = {
	extend:function(destObj) {
		for (var i = 1; i < arguments.length; i++) for (var key in arguments[i]) destObj[key] = arguments[i][key];
		return destObj;
	}
}
