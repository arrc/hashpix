(function(){
	'use strict';

	var CoreController = function($http, Search){
		var _this = this;
		_this.fullSearchResults;
		_this.results = [];
		_this.counter = 0;
		_this.loading = false;

		// 'get serach' ----------------------------
		_this.getSearch = function(){
			console.log(_this.searchTerm)
			_this.loading = true;
			Search.getSearch(_this.searchTerm).then(function(data){
				_this.loading = false;
				_this.fullSearchResults = data;
				_this.results = _this.fullSearchResults[0];
			}, function(error){
				console.log(error);
			})
		}

		// 'load more' ----------------------------
		_this.loadMore = function(){
			_this.counter += 1;
			var nextResultSet = _this.fullSearchResults[_this.counter];
			angular.forEach(nextResultSet, function(i){
				_this.results.push(i);
			})
		}
	};

	/* ==========================================================
		setup
	============================================================ */
	angular.module('hashPix').controller('CoreController',[
		'$http',
		'Search',
		CoreController
	]);
})();
