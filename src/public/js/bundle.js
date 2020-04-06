(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colorwheel_js_1 = require("./colorwheel.js");
exports.usedColors = [];
// document.getElementById('color-button').style.boxShadow = 'inset 3px 3px 8px #DADADA, inset -3px -3px 8px rgba(255, 255, 255, 0.5)';
function generateUsedColors(usedColors) {
    // default text can be removed 
    if (usedColors.length == 1) {
        var noColorsInHistory = document.getElementById('noColorsInHistory');
        if (noColorsInHistory != null) {
            noColorsInHistory.parentNode.removeChild(noColorsInHistory);
        }
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
exports.generateUsedColors = generateUsedColors;
function removeUsedColors() {
    var colorBlock = document.getElementsByClassName('colorblock');
    while (colorBlock[0]) {
        colorBlock[0].parentNode.removeChild(colorBlock[0]);
    }
}
exports.removeUsedColors = removeUsedColors;
function getColorFromHistory() {
    var _loop_1 = function (i) {
        document.getElementsByClassName('colorblock')[i].addEventListener("click", function (e) {
            colorwheel_js_1.colorWheel.hex = exports.usedColors[i];
        });
    };
    for (var i = 0; i < document.getElementsByClassName('colorblock').length; i++) {
        _loop_1(i);
    }
}
exports.getColorFromHistory = getColorFromHistory;

},{"./colorwheel.js":2}],2:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reinvented-color-wheel/css/reinvented-color-wheel.min.css");
var reinvented_color_wheel_1 = __importDefault(require("reinvented-color-wheel"));
// create a new color picker
exports.colorWheel = new reinvented_color_wheel_1.default({
    appendTo: document.getElementById('colourpickercontainer'),
    // followings are optional properties and their default values.
    // initial color (can be specified in hsv / hsl / rgb / hex)
    // hsv: [0, 100, 100],
    // hsl: [0, 100, 50],
    // rgb: [255, 0, 0],
    hex: "#0086ff",
    // appearance
    wheelDiameter: 200,
    wheelThickness: 30,
    handleDiameter: 26,
    wheelReflectsSaturation: true,
    // handler
    onChange: function (color) {
        // the only argument is the ReinventedColorWheel instance itself.
        //console.log("hsv:", color.hsv[0], color.hsv[1], color.hsv[2]);
        document.getElementById('color-dot').style.background = color.hex;
    },
});

},{"reinvented-color-wheel":13,"reinvented-color-wheel/css/reinvented-color-wheel.min.css":14}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("./index.js");
var Eraser = /** @class */ (function () {
    function Eraser() {
        var _this = this;
        this.size = 10;
        this.changeEraserSize = function () {
            var slider = document.getElementById("eraserslider");
            _this.size = Number(slider.value) || 10;
        };
        this.changeEraserType = function (e) {
            var selectedEraser = document.getElementById(e.target.id);
            var otherErasers = document.getElementsByClassName("erasercontainer");
            index_js_1.mode.isdrawingmode = false;
            for (var i = 0; i < otherErasers.length; i++) {
                otherErasers[i].style.background = '#A6A6A6';
            }
            selectedEraser.style.background = "#4FA2EE";
            _this.brush = e.target.id;
            var brushes = document.getElementsByClassName("brushcontainer");
            for (var i = 0; i < brushes.length; i++) {
                brushes[i].style.background = '#A6A6A6';
            }
            document.getElementById("eraser").classList.add('active');
            document.getElementById("paintbrush").classList.remove('active');
            document.getElementById("eraser").src = "/images/eraser-button-active.svg";
            document.getElementById("paintbrush").src = "/images/paintbrush-button.svg";
        };
        this.createUserEvents();
    }
    Object.defineProperty(Eraser.prototype, "getEraserSize", {
        get: function () {
            return this.size || 10;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Eraser.prototype, "getBrush", {
        get: function () {
            return this.brush;
        },
        enumerable: true,
        configurable: true
    });
    Eraser.prototype.createUserEvents = function () {
        var slider = document.getElementById("eraserslider");
        slider.addEventListener("input", this.changeEraserSize);
        var eraser = document.getElementsByClassName("erasercontainer");
        for (var i = 0; i < eraser.length; i++) {
            eraser[i].addEventListener("click", this.changeEraserType);
        }
    };
    return Eraser;
}());
exports.Eraser = Eraser;

},{"./index.js":4}],4:[function(require,module,exports){
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

},{"./colors.js":1,"./colorwheel.js":2,"./eraser.js":3,"./paintbrush.js":5,"./window.js":6}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("./index.js");
var Paintbrush = /** @class */ (function () {
    function Paintbrush() {
        var _this = this;
        this.size = 10;
        this.changeBrushSize = function () {
            var slider = document.getElementById("brushslider");
            _this.size = Number(slider.value) || 10;
        };
        this.changeBrushType = function (e) {
            var selectedBrush = document.getElementById(e.target.id);
            var otherBrushes = document.getElementsByClassName("brushcontainer");
            index_js_1.mode.isdrawingmode = true;
            for (var i = 0; i < otherBrushes.length; i++) {
                otherBrushes[i].style.background = '#A6A6A6';
            }
            selectedBrush.style.background = "#4FA2EE";
            _this.brush = e.target.id;
            var erasers = document.getElementsByClassName("erasercontainer");
            for (var i = 0; i < erasers.length; i++) {
                erasers[i].style.background = '#A6A6A6';
            }
            document.getElementById("paintbrush").classList.add('active');
            document.getElementById("eraser").classList.remove('active');
            document.getElementById("paintbrush").src = "/images/paintbrush-button-active.svg";
            document.getElementById("eraser").src = "/images/eraser-button.svg";
        };
        document.getElementById("normalbrush").style.background = '#4FA2EE';
        this.createUserEvents();
    }
    Object.defineProperty(Paintbrush.prototype, "getBrushSize", {
        get: function () {
            return this.size || 10;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Paintbrush.prototype, "getBrush", {
        get: function () {
            return this.brush;
        },
        enumerable: true,
        configurable: true
    });
    Paintbrush.prototype.createUserEvents = function () {
        var slider = document.getElementById("brushslider");
        slider.addEventListener("input", this.changeBrushSize);
        var brush = document.getElementsByClassName("brushcontainer");
        for (var i = 0; i < brush.length; i++) {
            brush[i].addEventListener("click", this.changeBrushType);
        }
    };
    return Paintbrush;
}());
exports.Paintbrush = Paintbrush;

},{"./index.js":4}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function closeWindows() {
    var openWindows = document.getElementsByClassName('side-window');
    for (var i = 0; i < openWindows.length; i++) {
        openWindows[i].style.display = 'none';
    }
    var pressedButtons = document.getElementsByClassName('side-buttons');
    for (var i = 0; i < pressedButtons.length; i++) {
        pressedButtons[i].style.boxShadow = '-3px -3px 8px #FFFFFF, 3px 3px 8px rgba(201, 201, 201, 0.5)';
        pressedButtons[i].classList.remove("pressed");
    }
}
exports.closeWindows = closeWindows;
// toggle windows 
var sideButtons = document.getElementsByClassName('side-buttons');
var windowId = '';
var _loop_1 = function (i) {
    sideButtons[i].addEventListener('mousedown', function () {
        var clickedButton = sideButtons[i];
        clickedButton.classList.add("pressed");
        if (clickedButton.id == 'color-button') {
            windowId = 'colourwindow';
        }
        else if (clickedButton.id == 'paintbrush-button') {
            windowId = 'brushwindow';
        }
        else if (clickedButton.id == 'eraser-button') {
            windowId = 'eraserwindow';
        }
        else {
            windowId = '';
        }
        var selectedWindow = document.getElementById(windowId);
        // close if opened
        if (selectedWindow.style.display !== 'none') {
            selectedWindow.style.display = 'none';
            document.getElementById(clickedButton.id).style.boxShadow = '-3px -3px 8px #FFFFFF, 3px 3px 8px rgba(201, 201, 201, 0.5)';
            clickedButton.classList.remove("pressed");
        }
        // open if closed
        else {
            var openWindows = document.getElementsByClassName("side-window");
            for (var i_1 = 0; i_1 < openWindows.length; i_1++) {
                openWindows[i_1].style.display = 'none';
            }
            var pressedButtons = document.getElementsByClassName('side-buttons');
            for (var i_2 = 0; i_2 < pressedButtons.length; i_2++) {
                pressedButtons[i_2].style.boxShadow = '-3px -3px 8px #FFFFFF, 3px 3px 8px rgba(201, 201, 201, 0.5)';
                pressedButtons[i_2].classList.remove("pressed");
            }
            selectedWindow.style.display = 'block';
            document.getElementById(clickedButton.id).style.boxShadow = 'inset 3px 3px 8px #474747, inset -3px -3px 8px rgba(165, 165, 165, 0.5)';
            clickedButton.classList.add("pressed");
        }
    });
    sideButtons[i].addEventListener('mouseup', function () {
        var clickedButton = sideButtons[i];
        if (clickedButton.classList.contains('pressed')) {
            clickedButton.style.boxShadow = "inset 3px 3px 8px #474747, inset -3px -3px 8px rgba(165, 165, 165, 0.5)";
        }
    });
    sideButtons[i].addEventListener('mouseover', function () {
        var hoverButton = sideButtons[i];
        hoverButton.style.background = "#6C6C6C";
        if (hoverButton.id == 'paintbrush-button') {
            document.getElementById("paintbrush").src = "/images/paintbrush-button-hover.svg";
        }
        else if (hoverButton.id == 'eraser-button') {
            document.getElementById("eraser").src = "/images/eraser-button-hover.svg";
        }
        if (hoverButton.classList.contains('pressed')) {
            hoverButton.style.boxShadow = "inset 3px 3px 8px #474747, inset -3px -3px 8px rgba(165, 165, 165, 0.5)";
        }
    });
    sideButtons[i].addEventListener('mouseout', function () {
        var button = sideButtons[i];
        button.style.background = "#EFEFEF";
        if (button.id == 'paintbrush-button') {
            var paintbrush = document.getElementById("paintbrush");
            if (paintbrush.classList.contains('active')) {
                paintbrush.src = "/images/paintbrush-button-active.svg";
            }
            else {
                paintbrush.src = "/images/paintbrush-button.svg";
            }
        }
        else if (button.id == 'eraser-button') {
            var eraser = document.getElementById("eraser");
            if (eraser.classList.contains('active')) {
                eraser.src = "/images/eraser-button-active.svg";
            }
            else {
                eraser.src = "/images/eraser-button.svg";
            }
        }
        if (button.classList.contains('pressed')) {
            button.style.boxShadow = "inset 3px 3px 8px #DADADA, inset -3px -3px 8px rgba(255, 255, 255, 0.5)";
        }
    });
};
for (var i = 0; i < sideButtons.length; i++) {
    _loop_1(i);
}
// side button hover

},{}],7:[function(require,module,exports){
'use strict';
// For more information about browser field, check out the browser field at https://github.com/substack/browserify-handbook#browser-field.

var styleElementsInsertedAtTop = [];

var insertStyleElement = function(styleElement, options) {
    var head = document.head || document.getElementsByTagName('head')[0];
    var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];

    options = options || {};
    options.insertAt = options.insertAt || 'bottom';

    if (options.insertAt === 'top') {
        if (!lastStyleElementInsertedAtTop) {
            head.insertBefore(styleElement, head.firstChild);
        } else if (lastStyleElementInsertedAtTop.nextSibling) {
            head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
        } else {
            head.appendChild(styleElement);
        }
        styleElementsInsertedAtTop.push(styleElement);
    } else if (options.insertAt === 'bottom') {
        head.appendChild(styleElement);
    } else {
        throw new Error('Invalid value for parameter \'insertAt\'. Must be \'top\' or \'bottom\'.');
    }
};

module.exports = {
    // Create a <link> tag with optional data attributes
    createLink: function(href, attributes) {
        var head = document.head || document.getElementsByTagName('head')[0];
        var link = document.createElement('link');

        link.href = href;
        link.rel = 'stylesheet';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            link.setAttribute('data-' + key, value);
        }

        head.appendChild(link);
    },
    // Create a <style> tag with optional data attributes
    createStyle: function(cssText, attributes, extraOptions) {
        extraOptions = extraOptions || {};

        var style = document.createElement('style');
        style.type = 'text/css';

        for (var key in attributes) {
            if ( ! attributes.hasOwnProperty(key)) {
                continue;
            }
            var value = attributes[key];
            style.setAttribute('data-' + key, value);
        }

        if (style.sheet) { // for jsdom and IE9+
            style.innerHTML = cssText;
            style.sheet.cssText = cssText;
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
        } else if (style.styleSheet) { // for IE8 and below
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
            style.styleSheet.cssText = cssText;
        } else { // for Chrome, Firefox, and Safari
            style.appendChild(document.createTextNode(cssText));
            insertStyleElement(style, { insertAt: extraOptions.insertAt });
        }
    }
};

},{}],8:[function(require,module,exports){
function hsl2hsv(hsl) {
  var h = hsl[0],
      s = hsl[1] / 100,
      l = hsl[2] / 100,
      sv, v;

  if(l === 0) {
      // no need to do calc on black
      // also avoids divide by 0 error
      return [0, 0, 0];
  }

  l *= 2;
  s *= (l <= 1) ? l : 2 - l;
  v = (l + s) / 2;
  sv = (2 * s) / (l + s);
  return [h, sv * 100, v * 100];
}

module.exports = hsl2hsv;
},{}],9:[function(require,module,exports){
function hsv2hsl(hsv) {
  var h = hsv[0],
      s = hsv[1] / 100,
      v = hsv[2] / 100,
      sl, l;

  l = (2 - s) * v;
  sl = s * v;
  sl /= (l <= 1) ? l : 2 - l;
  sl = sl || 0;
  l /= 2;
  return [h, sl * 100, l * 100];
}

module.exports = hsv2hsl;
},{}],10:[function(require,module,exports){
var clamp = require("../util/clamp");

function componentToHex(c) {
  var value = Math.round(clamp(c, 0, 255));
  var hex   = value.toString(16);

  return hex.length == 1 ? "0" + hex : hex;
}

function rgb2hex(rgb) {
  var alpha = rgb.length === 4 ? componentToHex(rgb[3] * 255) : "";

  return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]) + alpha;
}

module.exports = rgb2hex;
},{"../util/clamp":12}],11:[function(require,module,exports){
function expand(hex) {
  var result = "#";

  for (var i = 1; i < hex.length; i++) {
    var val = hex.charAt(i);
    result += val + val;
  }

  return result;
}

function hex(hex) {
  // #RGB or #RGBA
  if(hex.length === 4 || hex.length === 5) {
    hex = expand(hex);
  }

  var rgb = [
    parseInt(hex.substring(1,3), 16),
    parseInt(hex.substring(3,5), 16),
    parseInt(hex.substring(5,7), 16)
  ];

  // #RRGGBBAA
  if (hex.length === 9) {
    var alpha = parseFloat((parseInt(hex.substring(7,9), 16) / 255).toFixed(2));
    rgb.push(alpha);
  }

  return rgb;
}

module.exports = hex;
},{}],12:[function(require,module,exports){
function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

module.exports = clamp;
},{}],13:[function(require,module,exports){
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _hsl2hsv = _interopDefault(require('pure-color/convert/hsl2hsv'));
var _hsv2hsl = _interopDefault(require('pure-color/convert/hsv2hsl'));
var _rgb2hex = _interopDefault(require('pure-color/convert/rgb2hex'));
var _hex2rgb = _interopDefault(require('pure-color/parse/hex'));

// http://www.rapidtables.com/convert/color/rgb-to-hsv.htm
function rgb2hsv(rgb) {
    var r = rgb[0];
    var g = rgb[1];
    var b = rgb[2];
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var delta = max - min;
    var h = delta && 60 * (max === r ? (g - b) / delta % 6 :
        max === g ? (b - r) / delta + 2 :
            (r - g) / delta + 4);
    return [
        h < 0 ? h + 360 : h,
        max && delta * 100 / max,
        max * 100 / 255,
    ];
}

// http://www.rapidtables.com/convert/color/hsv-to-rgb.htm
function hsv2rgb(hsv) {
    var h = hsv[0] / 60;
    var s = hsv[1] / 100;
    var v = hsv[2] / 100;
    var c = v * s;
    var x = c * (1 - Math.abs(h % 2 - 1));
    var m = v - c;
    var _x = (x + m) * 255 + .5 | 0;
    var _c = (c + m) * 255 + .5 | 0;
    var _0 = m * 255 + .5 | 0;
    var _h = h | 0;
    return (_h === 1 ? [_x, _c, _0] :
        _h === 2 ? [_0, _c, _x] :
            _h === 3 ? [_0, _x, _c] :
                _h === 4 ? [_x, _0, _c] :
                    _h === 5 ? [_c, _0, _x] :
                        [_c, _x, _0]);
}

function normalizeHsvOrDefault(hsv, defaultHsvOrHsl) {
    if (hsv) {
        return [
            isFiniteNumber(hsv[0]) ? normalizeHue(hsv[0]) : defaultHsvOrHsl[0],
            isFiniteNumber(hsv[1]) ? normalizePercentage(hsv[1]) : defaultHsvOrHsl[1],
            isFiniteNumber(hsv[2]) ? normalizePercentage(hsv[2]) : defaultHsvOrHsl[2],
        ];
    }
    else {
        return defaultHsvOrHsl;
    }
}
function normalizeHsl(hsl) {
    return [
        normalizeHue(hsl[0]),
        normalizePercentage(hsl[1]),
        normalizePercentage(hsl[2]),
    ];
}
function normalizeHue(value) {
    var modulo = Math.round(value % 360 * 10) / 10;
    return modulo < 0 ? modulo + 360 : modulo;
}
function normalizePercentage(value) {
    return value < 0 ? 0 : value > 100 ? 100 : (value * 10 + .5 | 0) / 10;
}
function isFiniteNumber(n) {
    return typeof n === 'number' && isFinite(n);
}

var onDrag = 
// for IE, Edge, Firefox, Chrome
'PointerEvent' in window ?
    function (element, onDragStart, onDragMove) {
        element.addEventListener('pointerdown', function (event) {
            if (event.button === 0 && onDragStart(event) !== false) {
                this.setPointerCapture(event.pointerId);
            }
        });
        element.addEventListener('pointermove', function (event) {
            if (this.hasPointerCapture(event.pointerId)) {
                onDragMove(event);
            }
        });
    }
    // for Mobile Safari
    : 'ontouchend' in window ?
        function (element, onDragStart, onDragMove) {
            var dragging = false;
            element.addEventListener('touchstart', function (event) {
                if (event.touches.length === 1 && onDragStart(event.touches[0]) !== false) {
                    dragging = true;
                    event.preventDefault();
                }
            });
            element.addEventListener('touchmove', function (event) {
                if (dragging && event.touches.length === 1) {
                    event.preventDefault();
                    onDragMove(event.touches[0]);
                }
            });
        }
        // for Safari
        :
            function (element, onDragStart, onDragMove) {
                var onMouseMove = function (event) {
                    onDragMove(event);
                };
                var onMouseUp = function () {
                    removeEventListener('mouseup', onMouseUp);
                    removeEventListener('mousemove', onMouseMove);
                };
                element.addEventListener('mousedown', function (event) {
                    if (event.button === 0 && onDragStart(event) !== false) {
                        addEventListener('mousemove', onMouseMove);
                        addEventListener('mouseup', onMouseUp);
                    }
                });
            };

var defaultOptions = {
    hsv: [0, 100, 100],
    hsl: [0, 100, 50],
    wheelDiameter: 200,
    wheelThickness: 20,
    handleDiameter: 16,
    wheelReflectsSaturation: true,
    onChange: function () { },
};
var Matrix = window.DOMMatrix || window.WebKitCSSMatrix || window.MSCSSMatrix;
var inverseTransform = function (element) {
    var ancestors = [element];
    while (element = element.parentElement) {
        ancestors.push(element);
    }
    var matrix = new Matrix();
    for (var i = ancestors.length - 1; i >= 0; i--) {
        var style = getComputedStyle(ancestors[i]);
        var transform = style.transform;
        if (transform && transform !== 'none') {
            var transformOrigin = style.transformOrigin.split(' ').map(parseFloat);
            matrix = matrix
                .translate(transformOrigin[0], transformOrigin[1])
                .multiply(new Matrix(transform))
                .translate(-transformOrigin[0], -transformOrigin[1]);
        }
    }
    return matrix.inverse();
};
var ReinventedColorWheel = /** @class */ (function () {
    function ReinventedColorWheel(options) {
        var _this = this;
        this.options = options;
        this.wheelDiameter = this.options.wheelDiameter || defaultOptions.wheelDiameter;
        this.wheelThickness = this.options.wheelThickness || defaultOptions.wheelThickness;
        this.handleDiameter = this.options.handleDiameter || defaultOptions.handleDiameter;
        this.onChange = this.options.onChange || defaultOptions.onChange;
        this.wheelReflectsSaturation = this.options.wheelReflectsSaturation !== undefined ? this.options.wheelReflectsSaturation : defaultOptions.wheelReflectsSaturation;
        this.rootElement = this.options.appendTo.appendChild(createElementWithClass('div', 'reinvented-color-wheel'));
        this.hueWheelElement = this.rootElement.appendChild(createElementWithClass('canvas', 'reinvented-color-wheel--hue-wheel'));
        this.hueWheelContext = this.hueWheelElement.getContext('2d');
        this.hueHandleElement = this.rootElement.appendChild(createElementWithClass('div', 'reinvented-color-wheel--hue-handle'));
        this.svSpaceElement = this.rootElement.appendChild(createElementWithClass('canvas', 'reinvented-color-wheel--sv-space'));
        this.svSpaceContext = this.svSpaceElement.getContext('2d');
        this.svHandleElement = this.rootElement.appendChild(createElementWithClass('div', 'reinvented-color-wheel--sv-handle'));
        this._redrawHueWheel = function () {
            _this._redrawHueWheelRequested = false;
            var wheelDiameter = _this.wheelDiameter;
            var center = wheelDiameter / 2;
            var radius = center - _this.wheelThickness / 2;
            var TO_RAD = Math.PI / 180;
            var hslPostfix = _this.wheelReflectsSaturation ? "," + _this._hsl[1] + "%," + _this._hsl[2] + "%)" : ',100%,50%)';
            var ctx = _this.hueWheelContext;
            ctx.clearRect(0, 0, wheelDiameter, wheelDiameter);
            ctx.lineWidth = _this.wheelThickness;
            for (var i = 0; i < 360; i++) {
                ctx.beginPath();
                ctx.arc(center, center, radius, (i - 90.7) * TO_RAD, (i - 89.3) * TO_RAD);
                ctx.strokeStyle = 'hsl(' + i + hslPostfix;
                ctx.stroke();
            }
        };
        this.hueWheelContext.imageSmoothingEnabled = false;
        this.svSpaceContext.imageSmoothingEnabled = false;
        this._hsv = normalizeHsvOrDefault(options.hsv ? options.hsv :
            options.hsl ? ReinventedColorWheel.hsl2hsv(options.hsl) :
                options.rgb ? ReinventedColorWheel.rgb2hsv(options.rgb) :
                    options.hex ? ReinventedColorWheel.rgb2hsv(ReinventedColorWheel.hex2rgb(options.hex)) :
                        undefined, defaultOptions.hsv);
        this._hsl = normalizeHsl(ReinventedColorWheel.hsv2hsl(this._hsv));
        this._rgb = ReinventedColorWheel.hsv2rgb(this._hsv);
        this._hex = ReinventedColorWheel.rgb2hex(this._rgb);
        var invertTransform = function (x, y) {
            var m = _this._inverseTransform.multiply(new Matrix("matrix(1,0,0,1," + x + "," + y + ")"));
            return { x: m.e, y: m.f };
        };
        var onDragStart = function (element) {
            _this._inverseTransform = inverseTransform(element);
            var rect = element.getBoundingClientRect();
            _this._center = invertTransform(rect.left + rect.width / 2, rect.top + rect.height / 2);
        };
        var onDragStartHue = function (event) {
            onDragStart(_this.hueWheelElement);
            var point = invertTransform(event.clientX, event.clientY);
            var x = point.x - _this._center.x;
            var y = point.y - _this._center.y;
            var wheelInnerRadius = _this.wheelDiameter / 2 - _this.wheelThickness;
            if (x * x + y * y < wheelInnerRadius * wheelInnerRadius) {
                return false;
            }
            onDragMoveHue(event);
        };
        var onDragMoveHue = function (event) {
            var point = invertTransform(event.clientX, event.clientY);
            var x = point.x - _this._center.x;
            var y = point.y - _this._center.y;
            var angle = Math.atan2(y, x);
            _this.hsv = [angle * 180 / Math.PI + 90, _this.hsv[1], _this.hsv[2]];
        };
        var onDragMoveSv = function (event) {
            var point = invertTransform(event.clientX, event.clientY);
            var a = 100 / _this.svSpaceElement.width;
            var s = (point.x - _this._center.x) * a + 50;
            var v = (_this._center.y - point.y) * a + 50;
            _this.hsv = [_this._hsv[0], s, v];
        };
        var onDragStartSv = function (event) {
            onDragStart(_this.svSpaceElement);
            onDragMoveSv(event);
        };
        onDrag(this.hueWheelElement, onDragStartHue, onDragMoveHue);
        onDrag(this.svSpaceElement, onDragStartSv, onDragMoveSv);
        onDrag(this.svHandleElement, onDragStartSv, onDragMoveSv);
        this.redraw();
    }
    Object.defineProperty(ReinventedColorWheel.prototype, "hsv", {
        get: function () { return this._hsv; },
        set: function (value) { this._setHSV(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReinventedColorWheel.prototype, "hsl", {
        get: function () { return this._hsl; },
        set: function (value) { this._setHSV(ReinventedColorWheel.hsl2hsv(value)); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReinventedColorWheel.prototype, "rgb", {
        get: function () { return this._rgb; },
        set: function (value) { this._setHSV(ReinventedColorWheel.rgb2hsv(value)); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReinventedColorWheel.prototype, "hex", {
        get: function () { return this._hex; },
        set: function (value) { this.rgb = ReinventedColorWheel.hex2rgb(value); },
        enumerable: true,
        configurable: true
    });
    /** @deprecated */ ReinventedColorWheel.prototype.setHSV = function () { this.hsv = arguments; };
    /** @deprecated */ ReinventedColorWheel.prototype.setHSL = function () { this.hsl = arguments; };
    ReinventedColorWheel.prototype.redraw = function () {
        this.hueWheelElement.width = this.hueWheelElement.height = this.wheelDiameter;
        this.svSpaceElement.width = this.svSpaceElement.height = (this.wheelDiameter - this.wheelThickness * 2) * Math.SQRT1_2;
        var hueHandleStyle = this.hueHandleElement.style;
        var svHandleStyle = this.svHandleElement.style;
        hueHandleStyle.width = hueHandleStyle.height = svHandleStyle.width = svHandleStyle.height = this.handleDiameter + "px";
        hueHandleStyle.marginLeft = hueHandleStyle.marginTop = svHandleStyle.marginLeft = svHandleStyle.marginTop = -this.handleDiameter / 2 + "px";
        this._redrawHueWheel();
        this._redrawHueHandle();
        this._redrawSvSpace();
        this._redrawSvHandle();
    };
    ReinventedColorWheel.prototype._setHSV = function (hsv) {
        var oldHsv = this._hsv;
        var newHsv = this._hsv = normalizeHsvOrDefault(hsv, oldHsv);
        var hueChanged = oldHsv[0] - newHsv[0];
        var svChanged = oldHsv[1] - newHsv[1] || oldHsv[2] - newHsv[2];
        if (hueChanged) {
            this._hsl = [newHsv[0], this._hsl[1], this._hsl[2]];
            this._redrawHueHandle();
            this._updateSvBackground();
        }
        if (svChanged) {
            this._hsl = normalizeHsl(ReinventedColorWheel.hsv2hsl(newHsv));
            this._redrawSvHandle();
            if (this.wheelReflectsSaturation && !this._redrawHueWheelRequested) {
                requestAnimationFrame(this._redrawHueWheel);
                this._redrawHueWheelRequested = true;
            }
        }
        if (hueChanged || svChanged) {
            this._rgb = ReinventedColorWheel.hsv2rgb(newHsv);
            this._hex = ReinventedColorWheel.rgb2hex(this._rgb);
            this.onChange(this);
        }
    };
    ReinventedColorWheel.prototype._redrawSvSpace = function () {
        this._updateSvBackground();
        var sideLength = this.svSpaceElement.width;
        var ctx = this.svSpaceContext;
        var saturationGradient = ctx.createLinearGradient(0, 0, sideLength, 0);
        var valueGradient = ctx.createLinearGradient(0, 0, 0, sideLength);
        saturationGradient.addColorStop(0, 'rgba(255,255,255,1)');
        saturationGradient.addColorStop(1, 'rgba(255,255,255,0)');
        valueGradient.addColorStop(0, 'rgba(0,0,0,0)');
        valueGradient.addColorStop(1, 'rgba(0,0,0,1)');
        ctx.fillStyle = saturationGradient;
        ctx.fillRect(0, 0, sideLength, sideLength);
        ctx.fillStyle = valueGradient;
        ctx.fillRect(0, 0, sideLength, sideLength);
    };
    ReinventedColorWheel.prototype._updateSvBackground = function () {
        this.svSpaceElement.style.backgroundColor = "hsl(" + this._hsv[0] + ",100%,50%)";
    };
    ReinventedColorWheel.prototype._redrawHueHandle = function () {
        var center = this.wheelDiameter / 2;
        var wheelRadius = center - this.wheelThickness / 2;
        var angle = (this._hsv[0] - 90) * Math.PI / 180;
        var hueHandleStyle = this.hueHandleElement.style;
        hueHandleStyle.left = wheelRadius * Math.cos(angle) + center + "px";
        hueHandleStyle.top = wheelRadius * Math.sin(angle) + center + "px";
    };
    ReinventedColorWheel.prototype._redrawSvHandle = function () {
        var svSpaceElement = this.svSpaceElement;
        var svHandleStyle = this.svHandleElement.style;
        svHandleStyle.left = svSpaceElement.offsetLeft + svSpaceElement.offsetWidth * this._hsv[1] / 100 + "px";
        svHandleStyle.top = svSpaceElement.offsetTop + svSpaceElement.offsetHeight * (1 - this._hsv[2] / 100) + "px";
    };
    ReinventedColorWheel.default = ReinventedColorWheel;
    ReinventedColorWheel.defaultOptions = defaultOptions;
    ReinventedColorWheel.hsv2hsl = _hsv2hsl;
    ReinventedColorWheel.hsl2hsv = _hsl2hsv;
    ReinventedColorWheel.hsv2rgb = hsv2rgb;
    ReinventedColorWheel.rgb2hsv = rgb2hsv;
    ReinventedColorWheel.rgb2hex = _rgb2hex;
    ReinventedColorWheel.hex2rgb = _hex2rgb;
    return ReinventedColorWheel;
}());
function createElementWithClass(tagName, className) {
    var element = document.createElement(tagName);
    element.className = className;
    return element;
}

module.exports = ReinventedColorWheel;

},{"pure-color/convert/hsl2hsv":8,"pure-color/convert/hsv2hsl":9,"pure-color/convert/rgb2hex":10,"pure-color/parse/hex":11}],14:[function(require,module,exports){
var css = ".reinvented-color-wheel,\n.reinvented-color-wheel--hue-handle,\n.reinvented-color-wheel--hue-wheel,\n.reinvented-color-wheel--sv-handle,\n.reinvented-color-wheel--sv-space {\n  touch-action: manipulation;\n  touch-action: none;\n  -webkit-touch-callout: none;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.reinvented-color-wheel {\n  position: relative;\n  display: inline-block;\n  line-height: 0;\n  border-radius: 50%;\n}\n.reinvented-color-wheel--hue-wheel {\n  border-radius: 50%;\n}\n.reinvented-color-wheel--sv-space {\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  margin: auto;\n}\n.reinvented-color-wheel--hue-handle,\n.reinvented-color-wheel--sv-handle {\n  position: absolute;\n  box-sizing: border-box;\n  border-radius: 50%;\n  border: 2px solid #fff;\n  box-shadow: 0 0 0 1px #000 inset;\n}\n.reinvented-color-wheel--hue-handle {\n  pointer-events: none;\n}\n"; (require("browserify-css").createStyle(css, { "href": "node_modules\\reinvented-color-wheel\\css\\reinvented-color-wheel.min.css" }, { "insertAt": "bottom" })); module.exports = css;
},{"browserify-css":7}]},{},[4]);
