/**
 * Created by marcos on 24/03/2016.
 */

var ipc = require("electron").ipcRenderer;

angular.module('mecanography')
    .directive('mainbar', function ($rootScope) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/main_bar/main_bar.html',
            controller: function ($scope) {
                console.log('Controller created');

                $scope.closeApp = function(){
                    console.log('quit');
                    ipc.send('quit');
                };

                $scope.minimizeApp = function(){
                    console.log('minimize');
                    ipc.send('minimize');
                }
            }
        };
    });
