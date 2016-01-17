'use strict';

angular.module('mecanography').controller('MainCtrl', ['$scope', '$http', 'listOfLessons',
	function($scope, $http, listOfLessons) {

        $scope.allTheLessons = listOfLessons.data.lessons;
        $scope.total = 0;
        $scope.misses = 0;
        $scope.reset = function(item){
            $scope.currentSelected = item;
            $scope.currentLesson = (angular.copy($scope.allTheLessons[item].exercices));

        };


        $scope.$on('changeLesson',function(event, item){
            console.log('Lesson has changed ' + event + item);
            $scope.reset(item);

        });

        $scope.reset(0);

    }
]);
