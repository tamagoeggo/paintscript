"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function closeWindows() {
    var openWindows = document.getElementsByClassName('side-window');
    for (var i = 0; i < openWindows.length; i++) {
        openWindows[i].style.display = 'none';
    }
    var pressedButtons = document.getElementsByClassName('side-buttons');
    for (var i = 0; i < pressedButtons.length; i++) {
        pressedButtons[i].classList.remove("pressed");
        pressedButtons[i].classList.add("unpressed");
    }
}
exports.closeWindows = closeWindows;
// toggle windows 
var sideButtons = document.getElementsByClassName('side-buttons');
var windowId = '';
var _loop_1 = function (i) {
    sideButtons[i].addEventListener('mouseover', function () {
        var hoverButton = sideButtons[i];
        if (hoverButton.classList.contains('pressed')) {
            hoverButton.classList.remove("pressed");
            hoverButton.classList.add("hovering-pressed");
        }
        else if (hoverButton.classList.contains('unpressed')) {
            hoverButton.classList.remove("unpressed");
            hoverButton.classList.add("hovering-unpressed");
        }
        if (hoverButton.id == 'paintbrush-button') {
            document.getElementById("paintbrush").src = "/images/paintbrush-button-hover.svg";
        }
        else if (hoverButton.id == 'eraser-button') {
            document.getElementById("eraser").src = "/images/eraser-button-hover.svg";
        }
    });
    sideButtons[i].addEventListener('mouseout', function () {
        var button = sideButtons[i];
        if (button.classList.contains('hovering-pressed')) {
            button.classList.remove("hovering-pressed");
            button.classList.add("pressed");
        }
        else if (button.classList.contains('hovering-unpressed')) {
            button.classList.remove("hovering-unpressed");
            button.classList.add("unpressed");
        }
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
    });
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
        else {
            windowId = '';
        }
        var selectedWindow = document.getElementById(windowId);
        // if window is open, close it when button is clicked
        if (selectedWindow.style.display !== 'none') {
            selectedWindow.style.display = 'none';
            clickedButton.classList.remove("unpressed");
            clickedButton.classList.remove("pressed");
            clickedButton.classList.remove("hovering-pressed");
            clickedButton.classList.add("hovering-unpressed");
        }
        // if window is closed, open it when button is clicked
        else {
            var allWindows = document.getElementsByClassName("side-window");
            for (var i_1 = 0; i_1 < allWindows.length; i_1++) {
                allWindows[i_1].style.display = 'none';
            }
            for (var i_2 = 0; i_2 < sideButtons.length; i_2++) {
                sideButtons[i_2].classList.remove("hovering-unpressed");
                sideButtons[i_2].classList.remove("hovering-pressed");
                sideButtons[i_2].classList.remove("pressed");
                sideButtons[i_2].classList.add("unpressed");
            }
            selectedWindow.style.display = 'block';
            clickedButton.classList.remove("pressed");
            clickedButton.classList.remove("unpressed");
            clickedButton.classList.remove("hovering-unpressed");
            clickedButton.classList.add("hovering-pressed");
        }
    });
};
for (var i = 0; i < sideButtons.length; i++) {
    _loop_1(i);
}
//# sourceMappingURL=window.js.map