(function(){
	'use strict';
	
	var Search = function($http, $q){
		var o = {};

		o.getSearch = function(term){
			var dfd = $q.defer();
			var endpoint = '/api/search?q=' + term;
			console.log(endpoint);
			$http.get(endpoint)
				.success(function(res){
					dfd.resolve(res);
				})
				.error(function(error){
					dfd.reject(error);
				})
			return dfd.promise;
		}

		return o;
	};

	/* ========================================================== 
		Setup
	============================================================ */
	angular.module('hashPix').factory('Search',[
		'$http',
		'$q',
		Search
	]);
})();