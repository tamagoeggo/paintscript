"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toggleEraserWindow() {
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
}
exports.toggleEraserWindow = toggleEraserWindow;
var eraserType = null;
function getEraserType() {
}
exports.getEraserType = getEraserType;
//# sourceMappingURL=eraser.js.map