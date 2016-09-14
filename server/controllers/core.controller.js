'use strict';

var scripts = require('../config/scripts');

exports.index = function(req, res, next) {
	res.render('index', { scripts : scripts })
}

// exports.test = function(req, res){
// 	res.json({ message: 'its working.'})
// }
