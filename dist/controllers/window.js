"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function closeOpenWindows() {
    var openWindows = document.getElementsByClassName('side-window');
    for (var i = 0; i < openWindows.length; i++) {
        openWindows[i].style.display = 'none';
    }
    var pressedButtons = document.getElementsByClassName('side-buttons');
    for (var i = 0; i < pressedButtons.length; i++) {
        pressedButtons[i].style.boxShadow = '-3px -3px 8px #FFFFFF, 3px 3px 8px rgba(201, 201, 201, 0.5)';
    }
}
exports.closeOpenWindows = closeOpenWindows;
//# sourceMappingURL=window.js.map