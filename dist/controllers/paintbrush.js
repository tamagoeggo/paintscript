"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("./index.js");
// toggle brush window
document.getElementById('paintbrush-button').addEventListener('click', function () {
    var brushwindow = document.getElementById("brushwindow");
    if (brushwindow.style.display !== 'none') {
        brushwindow.style.display = 'none';
        document.getElementById('paintbrush-button').style.boxShadow = '-3px -3px 8px #FFFFFF, 3px 3px 8px rgba(201, 201, 201, 0.5)';
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
        brushwindow.style.display = 'block';
        document.getElementById('paintbrush-button').style.boxShadow = 'inset 3px 3px 8px #DADADA, inset -3px -3px 8px rgba(255, 255, 255, 0.5)';
    }
});
// paintbrush selection
var brush = document.getElementsByClassName("brushcontainer");
var _loop_1 = function (i) {
    brush[i].addEventListener('click', function () {
        var selectedBrush = brush[i];
        index_js_1.mode.drawingmode = true;
        for (var i_1 = 0; i_1 < brush.length; i_1++) {
            brush[i_1].style.background = '#A6A6A6';
        }
        selectedBrush.style.background = '#4FA2EE';
    });
};
for (var i = 0; i < brush.length; i++) {
    _loop_1(i);
}
// eraser size
var slider = document.getElementById("brushslider");
slider.oninput = function () {
    var canvas = document.getElementById('drawCanvas');
    var context = canvas.getContext("2d");
    context.lineWidth = Number(slider.value) || 50;
};
var brushType = null;
function getBrushType() {
}
exports.getBrushType = getBrushType;
//# sourceMappingURL=paintbrush.js.map