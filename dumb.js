'use strict'

var async = require('async');
var _ = require('lodash');
var Q = require('q');

var data = {
	'king' : {
		'roles' : [{'k1':'1k'},{'k2':'2k'},{'k3':'3k'},{'k4':'4k'}]
	},
	'queen' : {
		'roles' : [{'q1':'1q'},{'q2':'2q'},{'q3':'3q'},{'q4':'4q'}]
	},
	'ass' : {
		'roles' : [{'a1':'1a'},{'a2':'2a'},{'a3':'3a'},{'a4':'4a'}]
	}
}



var callMe = function(data) {
	var dfd = Q.defer();
	var arr = [];
	_.forEach(data, function(v,k){
		console.log(k)
		console.log(v)
		if(k === 'king') {
			v.roles.forEach(function(i){
				var t = {
					'source' : 'king',
					'roles' : i
				}
				arr.push(t);
			})
		} else if (k === 'queen') {
			v.roles.forEach(function(i){
				var t = {
					'source' : 'queen',
					'roles' : i
				}
				arr.push(t);
			})
			
		} else if (k === 'ass') {
			v.roles.forEach(function(i){
				var t = {
					'source' : 'ass',
					'roles' : i
				}
				arr.push(t);
			})
		}
	})
	return arr
}

var result = callMe(data);
console.log(result)
console.log('NEW RESULTS: ', _.chunk(result, 5));

var myArr = [
	[23,3,7],
	[5,7,98,34],
	[23,1],
	[3,654,875,456,9876,64,645]
];

console.log(_.size(myArr))

var link = "http://i.imgur.com/H3fbXHo.png";
var splitLink = link.split('.');
var newLink = splitLink[0] + '.' + splitLink[1] + '.' + splitLink[2];
console.log(newLink)