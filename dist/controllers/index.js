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
        // undo
        this.clickXHistory = [];
        this.clickYHistory = [];
        this.clickDragHistory = [];
        this.colorHistory = [];
        this.drawingModeHistory = [];
        this.brushSizeHistory = [];
        // redo
        this.clickXRedo = [];
        this.clickYRedo = [];
        this.clickDragRedo = [];
        this.colorRedo = [];
        this.drawingModeRedo = [];
        this.brushSizeRedo = [];
        this.clearCurrentClicks = function () {
            _this.clickX = [];
            _this.clickY = [];
            _this.clickDrag = [];
            _this.color = [];
            _this.drawingMode = [];
            _this.brushSize = [];
        };
        this.cancelEventHandler = function () {
            _this.paint = false;
        };
        this.releaseEventHandler = function () {
            _this.paint = false;
            _this.redraw(); // final redraw call
            _this.addClickHistory(_this.clickX, _this.clickY, _this.clickDrag, _this.color, _this.drawingMode, _this.brushSize);
            _this.clearCurrentClicks();
            colors.removeUsedColors();
            colors.generateUsedColors(colors.usedColors);
            colors.getColorFromHistory();
            _this.toggleUndoRedo();
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
            windows.closeWindows();
            if (_this.clickXRedo != [] &&
                _this.clickYRedo != [] &&
                _this.clickDragRedo != [] &&
                _this.colorRedo != [] &&
                _this.drawingModeRedo != [] &&
                _this.brushSizeRedo != []) {
                _this.clearRedo();
            }
            _this.toggleUndoRedo();
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
        this.undo = function () {
            var lastClickX = _this.clickXHistory.pop();
            var lastClickY = _this.clickYHistory.pop();
            var lastClickDrag = _this.clickDragHistory.pop();
            var lastColor = _this.colorHistory.pop();
            var lastDrawingMode = _this.drawingModeHistory.pop();
            var lastBrushSize = _this.brushSizeHistory.pop();
            // move last stroke to redo to save for later
            if (lastClickX != undefined) {
                _this.clickXRedo.push(lastClickX);
                _this.clickYRedo.push(lastClickY);
                _this.clickDragRedo.push(lastClickDrag);
                _this.colorRedo.push(lastColor);
                _this.drawingModeRedo.push(lastDrawingMode);
                _this.brushSizeRedo.push(lastBrushSize);
                _this.clickX = [].concat.apply([], _this.clickXHistory);
                _this.clickY = [].concat.apply([], _this.clickYHistory);
                _this.clickDrag = [].concat.apply([], _this.clickDragHistory);
                _this.color = [].concat.apply([], _this.colorHistory);
                _this.drawingMode = [].concat.apply([], _this.drawingModeHistory);
                _this.brushSize = [].concat.apply([], _this.brushSizeHistory);
                _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
                _this.redraw();
            }
            _this.toggleUndoRedo();
        };
        this.redo = function () {
            var lastClickX = _this.clickXRedo.pop();
            var lastClickY = _this.clickYRedo.pop();
            var lastClickDrag = _this.clickDragRedo.pop();
            var lastColor = _this.colorRedo.pop();
            var lastDrawingMode = _this.drawingModeRedo.pop();
            var lastBrushSize = _this.brushSizeRedo.pop();
            if (lastClickX != undefined) {
                _this.clickX = _this.clickX.concat(lastClickX);
                _this.clickY = _this.clickY.concat(lastClickY);
                _this.clickDrag = _this.clickDrag.concat(lastClickDrag);
                _this.color = _this.color.concat(lastColor);
                _this.drawingMode = _this.drawingMode.concat(lastDrawingMode);
                _this.brushSize = _this.brushSize.concat(lastBrushSize);
                _this.addClickHistory(lastClickX, lastClickY, lastClickDrag, lastColor, lastDrawingMode, lastBrushSize);
                _this.redraw();
            }
            _this.toggleUndoRedo();
        };
        this.clearRedo = function () {
            _this.clickXRedo = [];
            _this.clickYRedo = [];
            _this.clickDragRedo = [];
            _this.colorRedo = [];
            _this.drawingModeRedo = [];
            _this.brushSizeRedo = [];
        };
        this.toggleUndoRedo = function () {
            // redo
            var redo = document.getElementById("redo");
            if (_this.clickXRedo !== undefined || _this.clickXRedo.length != 0) {
                document.getElementById("redoimg").src = "/images/redo.svg";
                redo.classList.add("undo-redo-active");
            }
            if (_this.clickXRedo === undefined || _this.clickXRedo.length == 0) {
                document.getElementById("redoimg").src = "/images/redo-inactive.svg";
                redo.classList.remove("undo-redo-active");
            }
            // undo
            var undo = document.getElementById("undo");
            if (_this.clickXHistory !== undefined || _this.clickXHistory.length != 0) {
                document.getElementById("undoimg").src = "/images/undo.svg";
                undo.classList.add("undo-redo-active");
            }
            if (_this.clickXHistory === undefined || _this.clickXHistory.length == 0) {
                document.getElementById("undoimg").src = "/images/undo-inactive.svg";
                undo.classList.remove("undo-redo-active");
            }
            // hover
            // redo.addEventListener('mouseover', () => {
            //     if (this.clickXRedo !== undefined || this.clickXRedo.length != 0){
            //         redo.classList.remove("unpressed");
            //         redo.classList.remove("hovering-pressed");
            //         redo.classList.add("hovering-unpressed");
            //         (<HTMLImageElement>document.getElementById("redoimg")).src = "/images/redo-hover.svg";
            //     }
            //     else{
            //         (<HTMLImageElement>document.getElementById("redoimg")).src = "/images/redo-inactive.svg";
            //     }
            // });
            // redo.addEventListener('mouseout', () => {
            //     if (this.clickXRedo !== undefined || this.clickXRedo.length != 0){
            //         redo.classList.remove("hovering-unpressed");
            //         redo.classList.remove("hovering-pressed");
            //         redo.classList.add("unpressed");
            //     }
            // });
            // redo.addEventListener('mousedown', () => {
            //     if (this.clickXRedo !== undefined || this.clickXRedo.length != 0){
            //         redo.classList.remove("unpressed");
            //         redo.classList.remove("hovering-unpressed");
            //         redo.classList.add("hovering-pressed");
            //     }
            // });
            // redo.addEventListener('mouseup', () => {
            //     if (this.clickXRedo !== undefined || this.clickXRedo.length != 0){
            //         redo.classList.remove("unpressed");
            //         redo.classList.remove("hovering-pressed");
            //         redo.classList.add("hovering-unpressed");
            //     }
            // });
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
        document.getElementById('undo').addEventListener("click", this.undo);
        document.getElementById('redo').addEventListener("click", this.redo);
        //document.getElementById('clear').addEventListener("click", this.clearEventHandler);
    };
    // lets user draw on canvas
    DrawingApp.prototype.redraw = function () {
        var context = this.context;
        var clickX = this.clickX;
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
    DrawingApp.prototype.addClickHistory = function (x, y, dragging, color, mode, size) {
        this.clickXHistory.push(x);
        this.clickYHistory.push(y);
        this.clickDragHistory.push(dragging);
        this.colorHistory.push(color);
        this.drawingModeHistory.push(mode);
        this.brushSizeHistory.push(size);
    };
    return DrawingApp;
}());
exports.DrawingApp = DrawingApp;
exports.mode = { isdrawingmode: true };
document.getElementById('eraserwindow').style.display = 'none';
document.getElementById('brushwindow').style.display = 'none';
new DrawingApp();
//# sourceMappingURL=index.js.map