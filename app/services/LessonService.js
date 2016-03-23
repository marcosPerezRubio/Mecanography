angular.module('mecanography')
.service('LessonService',function($http) {

    var service = this;

    service.game = {


    };

    service.getLessons = function () {
        return $http.get('lessons/lessons.json');
    };






});