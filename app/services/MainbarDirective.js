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
                $scope.maximized = false;

                console.log('Controller created');

                $scope.closeApp = function () {
                    console.log('quit');
                    ipc.send('quit');
                };

                $scope.minimizeApp = function () {
                    console.log('minimize');
                    ipc.send('minimize');
                };

                $scope.reload = function () {
                    console.log('reload');
                    ipc.send('reload');
                };

                $scope.maximize = function () {
                    console.log('maximize');
                    $scope.maximized = !$scope.maximized;
                    ipc.send('maximize');
                };

                $scope.unmaximize = function () {
                    console.log('unmaximize');
                    $scope.maximized = !$scope.maximized;
                    ipc.send('unmaximize');
                }
            }
        };
    });
