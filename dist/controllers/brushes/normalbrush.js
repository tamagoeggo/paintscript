"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var colors = __importStar(require("../colors.js"));
var colorwheel_js_1 = require("../colorwheel.js");
function normalBrush(context, clickX, clickY, clickDrag, color, drawingMode, brushSize) {
    context.moveTo(clickX[0], clickY[0]);
    for (var i = 0; i < clickX.length - 2; ++i) {
        context.beginPath();
        context.strokeStyle = color[i];
        context.globalCompositeOperation = drawingMode[i];
        context.lineWidth = brushSize[i];
        var xc = (clickX[i] + clickX[i + 1]) / 2;
        var yc = (clickY[i] + clickY[i + 1]) / 2;
        context.quadraticCurveTo(clickX[i], clickY[i], xc, yc);
    }
    context.quadraticCurveTo(clickX[clickX.length - 2], clickY[clickY.length - 2], clickX[clickX.length - 1], clickY[clickY.length - 1]);
    context.stroke();
    context.closePath();
    if (colors.usedColors.indexOf(colorwheel_js_1.colorWheel.hex) == -1) {
        colors.usedColors.unshift(colorwheel_js_1.colorWheel.hex);
    }
}
exports.normalBrush = normalBrush;
//# sourceMappingURL=normalbrush.js.map