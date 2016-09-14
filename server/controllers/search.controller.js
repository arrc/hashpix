'use strict'

let request = require('request'),
async = require('async'),
keys = require('../config/keys'),
_ = require('lodash');


/* ==========================================================
	search function
============================================================ */
exports.search = function(req, res){
	var query = req.query.q;
	var processedArray = [];

	async.parallel({
		flickr : function(callback){
			// https://www.flickr.com/services/api/misc.urls.html
			var ENDPOINT = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&per_page=50&page=1&extras=url_n'
			ENDPOINT += '&api_key=' +  process.env.FLICKR_CID //keys.flickr.clientID
			ENDPOINT += '&text=' + query
			console.log(ENDPOINT);
			request(ENDPOINT, function(err, response, body){
				if (!err && response.statusCode == 200){
					var info = JSON.parse(body)
					console.log('Flicker count: ', info.photos.photo.length);
					callback(null, info)
				}
			})
		},
		// NOTE: Instagram changed their api policy & revoked public access to their
		// search endpoint. One has to be signed-in in order to search images.

		// instagram : function(callback){
		// 	var ENDPOINT = 'https://api.instagram.com/v1/tags/'+ query +'/media/recent?'
		// 	ENDPOINT += '&client_id=' + process.env.INSTAGRAM_CID + '&count=33'
		// 	console.log(ENDPOINT);
		//
		// 	request(ENDPOINT, function(err, response, body){
		// 		if (!err && response.statusCode == 200){
		// 			var info = JSON.parse(body)
		// 			console.log('INSTAGRAM: ', info.data.length);
		// 			callback(null, info)
		// 		}
		// 	})
		// },
		imgur : function(callback){
			var ENDPOINT = 'https://api.imgur.com/3/gallery/search?q=' + query
			var options = {
				url : ENDPOINT,
				headers: {
					'Authorization' : 'Client-ID ' +  process.env.IMGUR_CID
				}
			}

			request(options, function(err, response, body){
				if (!err && response.statusCode == 200) {
					var info = JSON.parse(body)
					console.log('IMGUR: ', info.data.length);
					callback(null, info)
				}
			})
		}
	}, function(err, results){
		if (err) {
			res.status(500).json({ error: err })
		} else {
			processRawResults(results, processedArray);
			var finalResult = pagedResult(processedArray);
			res.status(200).json(finalResult)
		}
	})
}

/* ==========================================================
	process raw results
============================================================ */
var processRawResults = function(results, processedArray) {
	_.forEach(results, function(value, key){
		if (key === "flickr") {
			var flickrPhotos = value.photos.photo;
			flickrPhotos.forEach(function(i){
				var t = {
					id : i.id,
					url : i.url_n,
					title: i.title,
					desc: '',
					user: i.owner,
					source: 'flickr'
				}
				processedArray.push(t)
			})
		} else if (key === "instagram") {
			var instagramPhotos = value.data;
			instagramPhotos.forEach(function(i){
				var t = {
					id : i.id,
					url : i.images.low_resolution.url,
					title: '',
					desc: i.caption.text,
					user: i.user.username,
					source: 'instagram',
					link: i.link
				}
				processedArray.push(t)
			})
		} else if (key === "imgur") {
			var imgurPhotos = value.data;
			imgurPhotos.forEach(function(i){
				if (!i.is_album) { // if is_album == false
					var link = i.link;
					var splitLink = link.split('.');
					var newLink = splitLink[0] + '.' + splitLink[1] + '.' + splitLink[2];
					var t = {
						id : i.id,
						url : i.link,
						title: i.title,
						desc: i.desc,
						user: i.account_url,
						source: 'imgur',
						link: newLink
					}
					processedArray.push(t)
				};
			})
		}
	})
};

/* ==========================================================
	paged result
============================================================ */
var pagedResult = function(processedArray){
	var shuffledArray = _.shuffle(processedArray);
	return _.chunk(shuffledArray, 12);
}
