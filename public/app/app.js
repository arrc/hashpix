(function(){
	'use strict';

	var app = angular.module("hashPix", ["ui.router", "mm.foundation", "wu.masonry", "akoenig.deckgrid", "angular-images-loaded"]);

	app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'app/core/views/home.view.html'
			})
	}]);

})();
