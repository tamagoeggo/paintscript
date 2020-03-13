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
            _this.context
                .clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            _this.clickX = [];
            _this.clickY = [];
            _this.clickDrag = [];
        };
        this.releaseEventHandler = function () {
            _this.paint = false;
            _this.redraw(); // final redraw call
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
            if (clickDrag[i] && i) {
                context.moveTo(clickX[i - 1], clickY[i - 1]);
            }
            else {
                context.moveTo(clickX[i] - 1, clickY[i]);
            }
            context.lineTo(clickX[i], clickY[i]);
            context.stroke();
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
new DrawingApp();
// set color in HSV / HSL / RGB / HEX
colourwheel_js_1.colorWheel.rgb = [255, 128, 64];
colourwheel_js_1.colorWheel.hsl = [120, 100, 50];
colourwheel_js_1.colorWheel.hsv = [240, 100, 100];
colourwheel_js_1.colorWheel.hex = '#888888';
// get color in HSV / HSL / RGB / HEX
console.log("hsv:", colourwheel_js_1.colorWheel.hsv[0], colourwheel_js_1.colorWheel.hsv[1], colourwheel_js_1.colorWheel.hsv[2]);
console.log("hsl:", colourwheel_js_1.colorWheel.hsl[0], colourwheel_js_1.colorWheel.hsl[1], colourwheel_js_1.colorWheel.hsl[2]);
console.log("rgb:", colourwheel_js_1.colorWheel.rgb[0], colourwheel_js_1.colorWheel.rgb[1], colourwheel_js_1.colorWheel.rgb[2]);
console.log("hex:", colourwheel_js_1.colorWheel.hex);
// please call redraw() after changing some appearance properties.
colourwheel_js_1.colorWheel.wheelDiameter = 400;
colourwheel_js_1.colorWheel.wheelThickness = 40;
colourwheel_js_1.colorWheel.redraw();
//# sourceMappingURL=index.js.map