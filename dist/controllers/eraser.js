"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("./index.js");
var Eraser = /** @class */ (function () {
    function Eraser() {
    }
    return Eraser;
}());
exports.Eraser = Eraser;
// toggle eraser window
document.getElementById('eraser-button').addEventListener('click', function () {
    var eraserwindow = document.getElementById("eraserwindow");
    if (eraserwindow.style.display !== 'none') {
        eraserwindow.style.display = 'none';
        document.getElementById('eraser-button').style.boxShadow = '-3px -3px 8px #FFFFFF, 3px 3px 8px rgba(201, 201, 201, 0.5)';
    }
    else {
        var openWindows = document.getElementsByClassName("side-window");
        for (var i = 0; i < openWindows.length; i++) {
            openWindows[i].style.display = 'none';
        }
        var pressedButtons = document.getElementsByClassName('side-buttons');
        for (var i = 0; i < pressedButtons.length; i++) {
            pressedButtons[i].style.boxShadow = '-3px -3px 8px #FFFFFF, 3px 3px 8px rgba(201, 201, 201, 0.5)';
        }
        eraserwindow.style.display = 'block';
        document.getElementById('eraser-button').style.boxShadow = 'inset 3px 3px 8px #DADADA, inset -3px -3px 8px rgba(255, 255, 255, 0.5)';
    }
});
// eraser selection
var eraser = document.getElementsByClassName("erasercontainer");
var _loop_1 = function (i) {
    eraser[i].addEventListener('click', function () {
        var selectedEraser = eraser[i];
        index_js_1.mode.drawingmode = false;
        for (var i_1 = 0; i_1 < eraser.length; i_1++) {
            eraser[i_1].style.background = '#A6A6A6';
        }
        selectedEraser.style.background = '#4FA2EE';
    });
};
for (var i = 0; i < eraser.length; i++) {
    _loop_1(i);
}
// eraser size
var slider = document.getElementById("eraserslider");
slider.oninput = function () {
    var canvas = document.getElementById('drawCanvas');
    var context = canvas.getContext("2d");
    context.lineWidth = Number(slider.value) || 10;
};
var eraserType = null;
function getEraserType() {
}
exports.getEraserType = getEraserType;
//# sourceMappingURL=eraser.js.map