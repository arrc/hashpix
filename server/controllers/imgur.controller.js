'use strict'

let request = require('request'),
keys = require('../config/keys')



/* ========================================================== 
	FETCHTOP
============================================================ */
exports.fetchTop = function(req, res){
	let ENDPOINT = 'https://api.imgur.com/3/gallery/hot/viral/0.json'
	let options = {
		url : ENDPOINT,
		headers: {
			'Authorization' : 'Client-ID ' + keys.imgur.clientID
		}
	}
	request(options, function(err, response, body){
		if (!err && response.statusCode == 200) {
			var info = JSON.parse(body)
			res.status(200).json(info)
		}
	})
}

/* ========================================================== 
	PRESSED
============================================================ */
exports.pressed = function(req, res){
	let ENDPOINT = 'https://public-api.wordpress.com/rest/v1.1/freshly-pressed/?fields=ID%2Ctitle%2Cexcerpt%2Ccontent%2Cpost_thumbnail&number=10'

	request(ENDPOINT, function(err, response, body){
		if(!err && response.statusCode == 200) {
			let info = JSON.parse(body);
			let numberOfPosts = info.number
			console.log('Number of posts',numberOfPosts)
		}
	})
}