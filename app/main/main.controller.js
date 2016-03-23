'use strict';

angular.module('mecanography').controller('MainCtrl', ['$scope', '$http', 'listOfLessons',
    function ($scope, $http, listOfLessons) {
        $scope.currentSelected = 0;
        function Game(currentLesson) {
            console.log('LESSON IS ' + currentLesson);
            this.number = currentLesson.number;
            this.name = currentLesson.name;
            this.fails = 0;
            this.time = 0;
            this.totalKeyPress = 0;
            this.index = 0;
            this.exercices = currentLesson.exercices;
            this.currentExercice = this.exercices[this.index];
        }


        Game.prototype.newKeyPressed = function (keyPressed) {
            var char = String.fromCharCode(keyPressed);
            console.log('CHAR PRESSED IS ' + char);
            console.log('CE IS ' + this.currentExercice);
            console.log('CHAR AT 0 IS ' + this.currentExercice.charAt(0));
            ++this.totalKeyPress;
            if (this.currentExercice.charAt(0).toUpperCase() == char) {
                if (this.currentExercice.length == 1) {
                    ++this.index;
                    console.log('index is ', this.index);
                    console.log('exercices length ', this.exercices.length);
                    if (this.index >= this.exercices.length) {
                        //game is finished
                        console.log('next lesson', this.index);
                        $scope.nextLesson();
                    }else {
                            this.currentExercice = this.exercices[this.index];
                    }

                }
                else {
                    this.currentExercice = this.currentExercice.slice(1);
                }
            }
            else ++this.fails;
        };

        Game.prototype.getHtml = function () {
            var firstLetter = this.currentExercice.charAt(0);
            if (firstLetter == ' ') {
                firstLetter = "_";
            }

            var text =
                "<p>" +
                "<span style=\"color:red\">"
                + firstLetter
                + "</span>"
                + "<span>"
                + this.currentExercice.slice(1)
                + "</span>"
                + "</p>";


            var length = this.exercices.length;
            for (var j = this.index + 1; j < length; ++j) {
                text += "<p>" + this.exercices[j] + "</p>";
            }
            return text;
        };


        $scope.allTheLessons = listOfLessons.data.lessons;

        $scope.reset = function (item) {
            console.log('All teh lessons ' + $scope.allTheLessons );
            $scope.currentSelected = item;
            $scope.currentLesson = (angular.copy($scope.allTheLessons[item]));
            $scope.currentGame = new Game($scope.currentLesson);
            document.getElementById("board").innerHTML = $scope.currentGame.getHtml();
        };

        $scope.nextLesson = function () {
            ++$scope.currentSelected;
            console.log('current Item ' + $scope.currentSelected);
            if($scope.currentSelected >= $scope.allTheLessons.length){
                //ALL LESSONS DONE
                $scope.currentSelected = 0;
            }
            $scope.currentLesson = (angular.copy($scope.allTheLessons[$scope.currentSelected]));
            console.log('current Lesson ' + $scope.currentLesson);
            $scope.currentGame = new Game($scope.currentLesson);
            document.getElementById("board").innerHTML = $scope.currentGame.getHtml();
        };


        $scope.$on('changeLesson', function (event, item) {
            console.log('Lesson has changed ' + event + item);
            $scope.currentSelected = item;
            $scope.reset(item);
        });

        $scope.reset($scope.currentSelected);

        $scope.keyPress = function (event) {
            var id = event.which;
            $scope.currentGame.newKeyPressed(id);

            //Refresh HTML
            document.getElementById("board").innerHTML = $scope.currentGame.getHtml();
        }
    }
]);
