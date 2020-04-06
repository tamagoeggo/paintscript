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
//# sourceMappingURL=window.js.map