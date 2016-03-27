angular.module('mecanography')
    .service('SidebarService', function (LessonService) {

        var service = this;

        // on startup, no menu items are defined. Modules can use addSidebar to add their sidebaritems


        service.sidebarLessonItems= [];
        LessonService.getLessons().then(function(data){
            var qtyOfLessons = data.data.lessons.length;
            for(var i = 0; i <  qtyOfLessons; ++i){
                service.addSidebarLessonItems(i);
            }
        });

        // remove all menu bar items
        service.clearSidebarLessonItems = function() {
            service.sidebarLessonItems= [];
        };

        // add a menu item
        service.addSidebarLessonItems = function(item) {
            service.sidebarLessonItems.push(item);
            // sort by order parameter
            service.sidebarLessonItems.sort(function (a, b) {
                return (a > b) ? 1 : ((b > a) ? -1 : 0);
            });
        };


        service.sidebarMainItems = [];



    })
    .directive('sidebar', function ($rootScope) {
        return {
            restrict: 'E',
            scope: false,
            replace: true,
            templateUrl: 'app/components/side_bar/side_bar.html',
            controller: function ($scope, SidebarService) {

                $scope.sidebarItemService = SidebarService;


                $scope.updateLesson = function(item){
                    console.log(item);
                    $scope.$emit('changeLesson',item);
                };

            },
            link: function (scope, element, attrs) {

            }
        };
    });
