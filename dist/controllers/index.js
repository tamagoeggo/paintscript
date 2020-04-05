"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var colorwheel_js_1 = require("./colorwheel.js");
var colors = __importStar(require("./colors.js"));
var eraser_js_1 = require("./eraser.js");
var paintbrush_js_1 = require("./paintbrush.js");
var windows = __importStar(require("./window.js"));
var DrawingApp = /** @class */ (function () {
    function DrawingApp() {
        var _this = this;
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
        this.color = [];
        this.drawingMode = [];
        this.brushSize = [];
        this.clickXHistory = [];
        this.clickYHistory = [];
        this.clickDragHistory = [];
        this.colorHistory = [];
        this.drawingModeHistory = [];
        this.brushSizeHistory = [];
        this.clearEventHandler = function () {
            _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            _this.clickX = [];
            _this.clickY = [];
            _this.clickDrag = [];
        };
        this.releaseEventHandler = function () {
            _this.paint = false;
            _this.redraw(); // final redraw call
            _this.clickXHistory = _this.clickXHistory.concat(_this.clickX);
            _this.clickYHistory = _this.clickYHistory.concat(_this.clickY);
            _this.clickDragHistory = _this.clickDragHistory.concat(_this.clickDrag);
            _this.colorHistory = _this.colorHistory.concat(_this.color);
            _this.drawingModeHistory = _this.drawingModeHistory.concat(_this.drawingMode);
            _this.brushSizeHistory = _this.brushSizeHistory.concat(_this.brushSize);
            _this.clickX = [];
            _this.clickY = [];
            _this.clickDrag = [];
            _this.color = [];
            _this.drawingMode = [];
            _this.brushSize = [];
            colors.removeUsedColors();
            colors.generateUsedColors(colors.usedColors);
            colors.getColorFromHistory();
            // console.log("paintbrush size: " + paintbrush.getBrushSize);
            // console.log("paintbrush brush: " + paintbrush.getBrush);
        };
        this.cancelEventHandler = function () {
            _this.paint = false;
        };
        // initial click/touch
        this.pressEventHandler = function (e) {
            var drawingMode = "source-over";
            var size = _this.paintbrush.getBrushSize;
            if (!exports.mode.isdrawingmode) {
                drawingMode = "destination-out";
                size = _this.eraser.getEraserSize;
            }
            var mouseX = e.changedTouches ?
                e.changedTouches[0].pageX :
                e.pageX;
            var mouseY = e.changedTouches ?
                e.changedTouches[0].pageY :
                e.pageY;
            mouseX -= _this.canvas.offsetLeft;
            mouseY -= _this.canvas.offsetTop;
            _this.paint = true;
            _this.addClick(mouseX, mouseY, false, colorwheel_js_1.colorWheel.hex, drawingMode, size);
            _this.redraw();
            windows.closeOpenWindows();
        };
        // moving of cursor/touch while in down state
        this.dragEventHandler = function (e) {
            var drawingMode = "source-over";
            var size = _this.paintbrush.getBrushSize;
            if (!exports.mode.isdrawingmode) {
                drawingMode = "destination-out";
                size = _this.eraser.getEraserSize;
            }
            var mouseX = e.changedTouches ?
                e.changedTouches[0].pageX :
                e.pageX;
            var mouseY = e.changedTouches ?
                e.changedTouches[0].pageY :
                e.pageY;
            mouseX -= _this.canvas.offsetLeft; // transforms xcoordinates relative to canvas
            mouseY -= _this.canvas.offsetTop; // transforms ycoordinates relative to canvas
            if (_this.paint) {
                _this.addClick(mouseX, mouseY, true, colorwheel_js_1.colorWheel.hex, drawingMode, size);
                _this.redraw();
            }
        };
        this.eraser = new eraser_js_1.Eraser();
        this.paintbrush = new paintbrush_js_1.Paintbrush();
        var canvas = document.getElementById('drawCanvas');
        var context = canvas.getContext("2d");
        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = 'black';
        //context.lineWidth = 10;        
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
        //document.getElementById('clear').addEventListener("click", this.clearEventHandler);
    };
    // lets user draw on canvas
    DrawingApp.prototype.redraw = function () {
        var clickX = this.clickX;
        var context = this.context;
        var clickDrag = this.clickDrag;
        var clickY = this.clickY;
        var color = this.color;
        var drawingMode = this.drawingMode;
        var brushSize = this.brushSize;
        //console.log(brushSize);
        for (var i = 0; i < clickX.length; ++i) {
            context.beginPath();
            context.strokeStyle = color[i];
            context.globalCompositeOperation = drawingMode[i];
            context.lineWidth = brushSize[i];
            if (clickDrag[i] && i) {
                context.moveTo(clickX[i - 1], clickY[i - 1]);
            }
            else {
                context.moveTo(clickX[i] - 1, clickY[i]);
            }
            context.lineTo(clickX[i], clickY[i]);
            context.stroke();
        }
        if (colors.usedColors.indexOf(colorwheel_js_1.colorWheel.hex) == -1) {
            colors.usedColors.unshift(colorwheel_js_1.colorWheel.hex);
            // console.log("usedColors:", colors.usedColors);
        }
        context.closePath();
    };
    DrawingApp.prototype.addClick = function (x, y, dragging, color, mode, size) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
        this.color.push(color);
        this.drawingMode.push(mode);
        this.brushSize.push(size);
    };
    return DrawingApp;
}());
exports.DrawingApp = DrawingApp;
exports.mode = { isdrawingmode: true };
document.getElementById('eraserwindow').style.display = 'none';
document.getElementById('brushwindow').style.display = 'none';
new DrawingApp();
//# sourceMappingURL=index.js.map