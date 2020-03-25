"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colourwheel_js_1 = require("./colourwheel.js");
var DrawingApp = /** @class */ (function () {
    function DrawingApp() {
        var _this = this;
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
        this.clearEventHandler = function () {
            _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            _this.clickX = [];
            _this.clickY = [];
            _this.clickDrag = [];
        };
        this.releaseEventHandler = function () {
            _this.paint = false;
            _this.redraw(); // final redraw call
            _this.clickX = [];
            _this.clickY = [];
            _this.clickDrag = [];
            removeUsedColors();
            generateUsedColors(usedColors);
            getColorFromHistory();
        };
        this.cancelEventHandler = function () {
            _this.paint = false;
        };
        // initial click/touch
        this.pressEventHandler = function (e) {
            var mouseX = e.changedTouches ?
                e.changedTouches[0].pageX :
                e.pageX;
            var mouseY = e.changedTouches ?
                e.changedTouches[0].pageY :
                e.pageY;
            mouseX -= _this.canvas.offsetLeft;
            mouseY -= _this.canvas.offsetTop;
            _this.paint = true;
            _this.addClick(mouseX, mouseY, false);
            _this.redraw();
        };
        // moving of cursor/touch while in down state
        this.dragEventHandler = function (e) {
            var mouseX = e.changedTouches ?
                e.changedTouches[0].pageX :
                e.pageX;
            var mouseY = e.changedTouches ?
                e.changedTouches[0].pageY :
                e.pageY;
            mouseX -= _this.canvas.offsetLeft; // transforms xcoordinates relative to canvas
            mouseY -= _this.canvas.offsetTop; // transforms ycoordinates relative to canvas
            if (_this.paint) {
                _this.addClick(mouseX, mouseY, true);
                _this.redraw();
            }
            e.preventDefault();
        };
        var canvas = document.getElementById('drawCanvas');
        var context = canvas.getContext("2d");
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        var width = document.getElementById('drawCanvas').scrollWidth;
        var height = document.getElementById('drawCanvas').scrollHeight;
        this.canvas = canvas;
        this.context = context;
        this.createUserEvents();
    }
    // set up handlers for canvas events
    // register both mouse and touch events
    DrawingApp.prototype.createUserEvents = function () {
        var canvas = this.canvas;
        canvas.addEventListener("mousedown", this.pressEventHandler);
        canvas.addEventListener("mousemove", this.dragEventHandler);
        canvas.addEventListener("mouseup", this.releaseEventHandler);
        canvas.addEventListener("mouseout", this.cancelEventHandler);
        canvas.addEventListener("touchstart", this.pressEventHandler);
        canvas.addEventListener("touchmove", this.dragEventHandler);
        canvas.addEventListener("touchend", this.releaseEventHandler);
        canvas.addEventListener("touchcancel", this.cancelEventHandler);
        document.getElementById('clear').addEventListener("click", this.clearEventHandler);
    };
    // lets user draw on canvas
    DrawingApp.prototype.redraw = function () {
        var clickX = this.clickX;
        var context = this.context;
        var clickDrag = this.clickDrag;
        var clickY = this.clickY;
        for (var i = 0; i < clickX.length; ++i) {
            context.beginPath();
            context.strokeStyle = colourwheel_js_1.colorWheel.hex;
            if (clickDrag[i] && i) {
                context.moveTo(clickX[i - 1], clickY[i - 1]);
            }
            else {
                context.moveTo(clickX[i] - 1, clickY[i]);
            }
            context.lineTo(clickX[i], clickY[i]);
            context.stroke();
        }
        if (usedColors.indexOf(colourwheel_js_1.colorWheel.hex) == -1) {
            usedColors.unshift(colourwheel_js_1.colorWheel.hex);
            console.log("usedColors:", usedColors);
        }
        context.closePath();
    };
    DrawingApp.prototype.addClick = function (x, y, dragging) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    };
    return DrawingApp;
}());
exports.DrawingApp = DrawingApp;
// color history
var usedColors = [];
function generateUsedColors(usedColors) {
    // default text can be removed 
    if (usedColors.length == 1) {
        var noColorsInHistory = document.getElementById('noColorsInHistory');
        noColorsInHistory.parentNode.removeChild(noColorsInHistory);
    }
    while (usedColors.length > 32) {
        usedColors.splice(-1, 1);
    }
    for (var _i = 0, usedColors_1 = usedColors; _i < usedColors_1.length; _i++) {
        var color = usedColors_1[_i];
        var usedColor = document.createElement('button');
        usedColor.className = "colorblock";
        usedColor.style.cssText = "width: 23px; height: 23px; background-color: " + color;
        document.getElementById('historycontainer').append(usedColor);
    }
}
function removeUsedColors() {
    var colorBlock = document.getElementsByClassName('colorblock');
    while (colorBlock[0]) {
        colorBlock[0].parentNode.removeChild(colorBlock[0]);
    }
}
function getColorFromHistory() {
    var _loop_1 = function (i) {
        document.getElementsByClassName('colorblock')[i].addEventListener("click", function (e) {
            colourwheel_js_1.colorWheel.hex = usedColors[i];
        });
    };
    for (var i = 0; i < document.getElementsByClassName('colorblock').length; i++) {
        _loop_1(i);
    }
}
new DrawingApp();
//# sourceMappingURL=index.js.map