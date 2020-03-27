"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toggleEraserWindow() {
    document.getElementById('eraser-button').addEventListener('click', function () {
        var eraserwindow = document.getElementById("eraserwindow");
        if (eraserwindow.style.display !== 'none') {
            eraserwindow.style.display = 'none';
        }
        else {
            eraserwindow.style.display = 'block';
        }
    });
}
exports.toggleEraserWindow = toggleEraserWindow;
//# sourceMappingURL=eraser.js.map