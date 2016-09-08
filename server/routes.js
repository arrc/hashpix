'use strict';

module.exports = function(app){
	var core = require('./controllers/core.controller.js');
	let imgurAPI = require('./controllers/imgur.controller.js');
	let flickrAPI = require('./controllers/flickr.controller.js');
	let searchAPI = require('./controllers/search.controller.js');

	// 'CORE' ----------------------------  
	app.route('/').get(core.index);
	app.route('/api/test').get(core.test);

	// 'IMGUR' ----------------------------  
	app.route('/api/imgur/top').get(imgurAPI.fetchTop)
	app.route('/api/pressed').get(imgurAPI.pressed)

	// 'FLICKR' ----------------------------  
	app.route('/api/flickr/search').get(flickrAPI.search)

	// 'SEARCH' ----------------------------  
	app.route('/api/search').get(searchAPI.search)
}