angular.module('mecanography')
    .service('SidebarService', function (LessonService) {

        var service = this;

        // on startup, no menu items are defined. Modules can use addSidebar to add their sidebaritems
        service.sidebarItems= [];

        LessonService.getLessons().then(function(data){
            var qtyOfLessons = data.data.lessons.length;
            for(var i = 0; i < qtyOfLessons; ++i){
                service.addSidebarItem(i);
            }
        });

        // remove all menu bar items
        service.clearSidebarItems = function() {
            service.sidebarItems= [];
        };

        // add a menu item
        service.addSidebarItem = function(item) {

            service.sidebarItems.push(item);

            // sort by order parameter
            service.sidebarItems.sort(function (a, b) {
                return (a > b) ? 1 : ((b > a) ? -1 : 0);
            });
        };
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
