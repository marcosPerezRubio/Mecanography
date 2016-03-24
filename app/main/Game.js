/**
 * Created by marcos on 23/03/2016.
 */
'use-strict'

function Game(allTheLessons) {
    this.allTheLessons = allTheLessons;
    this.index = 0;
    this.currentLesson = new Lesson(allTheLessons[this.index]);

    this.reset = function (index) {
        this.index = index;
        this.currentLesson = new Lesson(allTheLessons[this.index]);
    }
}

function Lesson(baseLesson) {
    this.name = baseLesson.name;
    this.number = baseLesson.number;
    this.exercices = baseLesson.exercices;

    this.index = 0;
    this.currentExercice = this.exercices[this.index];

    this.fails = 0;
    this.time = 0;
    this.totalKeyPress = 0;

    this.tick = function() {
        this.time += 1;
    };

    this.first = true;

    this.startTimer = function () {
        this.interval = setInterval(this.tick,1000);
    };

    this.stopTImer = function () {
        clearInterval(this.interval);
    }
}


Lesson.prototype.newKeyPressed = function (keyPressed) {

    if(this.first) {
        this.first = false;
        this.startTimer();
    }

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

                this.stopTImer();
                return true;
            } else {
                this.currentExercice = this.exercices[this.index];
            }

        }
        else {
            this.currentExercice = this.currentExercice.slice(1);
        }
    }
    else ++this.fails;
    return false;
};


Lesson.prototype.getHtml = function () {
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
}


Lesson.prototype.getHtml = function () {
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
}

