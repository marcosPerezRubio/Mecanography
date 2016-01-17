'use strict';

angular.module('mecanography', [
    'ui.router'
])
    .config(['$urlRouterProvider', '$locationProvider',
        function ($urlRouterProvider, $locationProvider) {
            $urlRouterProvider.otherwise('/');
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }]);