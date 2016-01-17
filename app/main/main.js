'use strict';

angular.module('mecanography').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider.state('main', {
			url: '/',
			controller: 'MainCtrl',
			templateUrl: 'app/main/main.html',
			resolve: {
				listOfLessons: ['LessonService',function(LessonService){
					return LessonService.getLessons();
				}]
			}
		});
	}
]);