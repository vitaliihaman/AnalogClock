/*

//functional style:

 function timeFn() {
 var date = new Date(),
 hours = date.getHours(),
 minutes = date.getMinutes(),
 seconds = date.getSeconds();

 var hoursArrow = document.getElementsByClassName("hours")[0],
 minutesArrow = document.getElementsByClassName("minutes")[0],
 secondsArrow = document.getElementsByClassName("seconds")[0];

 var cssHours = "position: absolute; top: 110px; left:185px;  transform-origin: bottom center; transform:",
 cssMinutes = "position: absolute; top: 70px; left:187px; transform-origin: bottom center; transform:",
 cssSeconds = "position: absolute; top: 70px; left:188px; transform-origin: bottom center; transform:";

 function degree(hours, minutes, seconds) {
 var h = 360 / 12 * hours,
 m = 360 / 60 * minutes,
 s = 360 / 60 * seconds;
 return moveArrow(h, m, s);
 }

 function moveArrow(h, m, s) {
 hoursArrow.style.cssText = cssHours + " rotate(" + h + "deg);";
 minutesArrow.style.cssText = cssMinutes + " rotate(" + m + "deg);";
 //secondsArrow.style.cssText = cssSeconds + " rotate(" + s + "deg);";
 secondsArrow.style = "transform: rotate(" + s + "deg);";
 console.log(" rotate(" + s + "deg)");
 console.dir(secondsArrow.style);

 }

 return degree(hours, minutes, seconds);
 }

 var buttons = document.getElementsByClassName("buttons");

 for (var i = 0; i < buttons.length; i++) {

 buttons[i].addEventListener("click", function (e) {
 if (this.id == "start") {
 var int = setInterval(timeFn, 1000);
 console.log(this.id);
 }
 if (this.id == "stop") {
 clearInterval(int);
 console.log(this.id);
 }
 });
 }
 */

//prototype style:

function Clock() {
    this.date = null;
    this.hoursArrow = null;
    this.minutesArrow = null;
    this.secondsArrow = null;
    this.intervalId = null;
    this.buttonStart = null;
    this.buttonStop = null;

    this.init();
}

Clock.prototype.init = function () {
    this.hoursArrow = document.querySelector(".hours");
    this.minutesArrow = document.querySelector(".minutes");
    this.secondsArrow = document.querySelector(".seconds");
    this.buttonStart = document.querySelector("#start");
    this.buttonStop = document.querySelector("#stop");
    this.onListeners();
};

Clock.prototype.onListeners = function () {
      var startCb = this.start.bind(this),
          stopCb = this.stop.bind(this);
    /* навесить колбеки на кнопки*/
    this.buttonStart.addEventListener("click",startCb);
    this.buttonStop.addEventListener("click", stopCb);
};

Clock.prototype.start = function () {
    if(!this.intervalId) {
        this.intervalId = setInterval(this.update.bind(this), 1000);
    }
};

Clock.prototype.stop = function () {
    clearInterval(this.intervalId);
    this.intervalId = null;
};

Clock.prototype.update = function () {
    this.date = new Date();
    var h = 360 / 12 * this.date.getHours(),
        m = 360 / 60 * this.date.getMinutes(),
        s = 360 / 60 * this.date.getSeconds();

    this.hoursArrow.style = "transform: rotate(" + h + "deg);";
    this.minutesArrow.style = "transform: rotate(" + m + "deg);";
    this.secondsArrow.style = "transform: rotate(" + s + "deg);";
};

var myClock = new Clock();

// добавить функционал встраивания в контейнер, + функционал destroy (убрать его)

