'use strict';

angular.module('mecanography').controller('MainCtrl', ['$scope', '$http', 'listOfLessons','$interval',
    function ($scope, $http, listOfLessons,$interval) {

        function Game(allTheLessons) {
            var that = this;
            that.allTheLessons = allTheLessons;
            that.index = 0;
            that.currentLesson = new Lesson(allTheLessons[that.index]);

            that.reset = function (index) {
                that.index = index;
                that.currentLesson = new Lesson(allTheLessons[that.index]);
            }

            that.nextLesson = function () {
                that.index = ++that.index%that.allTheLessons.length;
                that.currentLesson = new Lesson(allTheLessons[that.index]);
                return that.currentLesson;

            }

            that.getSelected = function () {
                return that.index;
            }
        }

        function Lesson(baseLesson) {
            var that = this;

            that.name = baseLesson.name;
            that.number = baseLesson.number;
            that.exercises = baseLesson.exercises;

            that.index = 0;
            that.currentExercise = that.exercises[that.index];

            that.totalLessonChars = (function(){
                var sum = 0 ;
                for (var exer in that.exercises){
                    sum += that.exercises[exer].length;
                }
                return sum;
            })();

            that.finish = false;
            that.fails = 0;
            that.hits = 0;
            that.totalKeyPress = 0;
        }

        Lesson.prototype.computePercentage = function(){
            console.log('Hits ' + this.hits);
            console.log('TLC ' + this.totalLessonChars);
           this.percentage = Math.floor(100*this.hits/this.totalLessonChars);
        };

        Lesson.prototype.newKeyPressed = function (keyPressed) {
            var char = String.fromCharCode(keyPressed);
            console.log('CHAR PRESSED IS ' + char);
            console.log('CE IS ' + this.currentExercise);
            console.log('CHAR AT 0 IS ' + this.currentExercise.charAt(0));
            ++this.totalKeyPress;
            if (this.currentExercise.charAt(0).toUpperCase() == char) {
                ++this.hits;
                this.computePercentage();
                if (this.currentExercise.length == 1) {
                    ++this.index;
                    console.log('index is ', this.index);
                    console.log('exercises length ', this.exercises.length);
                    if (this.index >= this.exercises.length) {
                        //game is finished
                        console.log('next lesson ', this.index);
                        this.currentExercise = "";
                        this.finish = true;
                    } else {
                        this.currentExercise = this.exercises[this.index];
                    }

                }
                else {
                    this.currentExercise = this.currentExercise.slice(1);
                }
            }
            else ++this.fails;
        };


        Lesson.prototype.getHtml = function () {
            var firstLetter = this.currentExercise.charAt(0);
            if (firstLetter == ' ') {
                firstLetter = "_";
            }
            var text =
                "<h2>" +
                "<span style=\"color:red\">"
                + firstLetter
                + "</span>"
                + "<span>"
                + this.currentExercise.slice(1)
                + "</span>"
                + "</h2>";


            var length = this.exercises.length;
            for (var j = this.index + 1; j < length; ++j) {
                text += "<h3>" + this.exercises[j] + "</h3>";
            }
            return text;
        }



        $scope.time = 0;
        $scope.allTheLessons = listOfLessons.data.lessons;
        $scope.currentGame = new Game($scope.allTheLessons);
        $scope.currentLesson = $scope.currentGame.currentLesson;

        $scope.first = true;

        $scope.currentSelected = 0;


        $scope.reset = function (item) {
            $scope.currentGame.reset(item);
            $scope.currentLesson = $scope.currentGame.currentLesson;
            $scope.time= 0;
            $scope.finish = false;
            $scope.currentSelected = $scope.currentGame.getSelected();
            document.getElementById("board").innerHTML = $scope.currentLesson.getHtml();
        };


        $scope.$on('changeLesson', function (event, item) {
            console.log('Lesson has changed ' + event + item);
            $scope.currentSelected = item;
            $scope.reset(item);
        });

        $scope.reset($scope.currentSelected);

        $scope.nextLesson = function(){
            $scope.currentLesson = $scope.currentGame.nextLesson();
            $scope.currentSelected = $scope.currentGame.getSelected();
            $scope.time= 0;
            this.first=true;
            document.getElementById("board").innerHTML = $scope.currentLesson.getHtml();
        }

        $scope.finish = false;
        $scope.keyPress = function (event) {
            var id = event.which;
            if(this.first){
                $scope.startTimer();
                this.first=false;
            }

            if(!$scope.currentLesson.finish) {
                $scope.currentLesson.newKeyPressed(id);
            }

            if($scope.currentLesson.finish) {
                console.log('FINISH IS ' + $scope.currentLesson.finish);
                $scope.stopTimer();

            }
            //Refresh HTML
            document.getElementById("board").innerHTML = $scope.currentLesson.getHtml();
        }

        $scope.finish = false;
        $scope.tick = function() {
            $scope.time += 1;
            console.log('TIME IS ' + $scope.time);
        };

        $scope.first = true;

        $scope.startTimer = function () {
            $scope.interval = $interval($scope.tick,1000);
        };

        $scope.stopTimer = function () {
            $interval.cancel($scope.interval);
        }

    }
]);
