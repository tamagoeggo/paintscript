"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var colorwheel_js_1 = require("./colorwheel.js");
exports.usedColors = [];
document.getElementById('color-button').style.boxShadow = 'inset 3px 3px 8px #DADADA, inset -3px -3px 8px rgba(255, 255, 255, 0.5)';
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
//# sourceMappingURL=colors.js.map