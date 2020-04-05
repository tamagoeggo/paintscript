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
    }
}
exports.closeWindows = closeWindows;
// toggle windows 
var sideButtons = document.getElementsByClassName('side-buttons');
var windowId = '';
var _loop_1 = function (i) {
    sideButtons[i].addEventListener('click', function () {
        var clickedButton = sideButtons[i];
        if (clickedButton.id == 'color-button') {
            windowId = 'colourwindow';
        }
        else if (clickedButton.id == 'paintbrush-button') {
            windowId = 'brushwindow';
        }
        else if (clickedButton.id == 'eraser-button') {
            windowId = 'eraserwindow';
        }
        var selectedWindow = document.getElementById(windowId);
        if (selectedWindow.style.display !== 'none') {
            selectedWindow.style.display = 'none';
            document.getElementById(clickedButton.id).style.boxShadow = '-3px -3px 8px #FFFFFF, 3px 3px 8px rgba(201, 201, 201, 0.5)';
        }
        else {
            var openWindows = document.getElementsByClassName("side-window");
            for (var i_1 = 0; i_1 < openWindows.length; i_1++) {
                openWindows[i_1].style.display = 'none';
            }
            var pressedButtons = document.getElementsByClassName('side-buttons');
            for (var i_2 = 0; i_2 < pressedButtons.length; i_2++) {
                pressedButtons[i_2].style.boxShadow = '-3px -3px 8px #FFFFFF, 3px 3px 8px rgba(201, 201, 201, 0.5)';
            }
            selectedWindow.style.display = 'block';
            document.getElementById(clickedButton.id).style.boxShadow = 'inset 3px 3px 8px #DADADA, inset -3px -3px 8px rgba(255, 255, 255, 0.5)';
        }
    });
};
for (var i = 0; i < sideButtons.length; i++) {
    _loop_1(i);
}
//# sourceMappingURL=window.js.map