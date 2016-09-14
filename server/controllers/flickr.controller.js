'use strict'

let request = require('request'),
// keys = require('../config/keys')

/* ==========================================================
	flickr search
============================================================ */
exports.search = function(req, res){
	let q = req.query.q

	var ENDPOINT = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1'
	ENDPOINT += '&api_key=' + process.env.FLICKR_CID//keys.flickr.clientID
	ENDPOINT += '&text=' + q

	console.log(ENDPOINT)
	request(ENDPOINT, function(err, response, body){
		if (!err && response.statusCode == 200){
			var info = JSON.parse(body)
			res.status(200).json(info)
		}
	})
}
