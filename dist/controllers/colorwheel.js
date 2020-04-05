"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reinvented-color-wheel/css/reinvented-color-wheel.min.css");
var reinvented_color_wheel_1 = __importDefault(require("reinvented-color-wheel"));
// create a new color picker
exports.colorWheel = new reinvented_color_wheel_1.default({
    appendTo: document.getElementById('colourpickercontainer'),
    // followings are optional properties and their default values.
    // initial color (can be specified in hsv / hsl / rgb / hex)
    // hsv: [0, 100, 100],
    // hsl: [0, 100, 50],
    // rgb: [255, 0, 0],
    hex: "#0086ff",
    // appearance
    wheelDiameter: 200,
    wheelThickness: 30,
    handleDiameter: 26,
    wheelReflectsSaturation: true,
    // handler
    onChange: function (color) {
        // the only argument is the ReinventedColorWheel instance itself.
        //console.log("hsv:", color.hsv[0], color.hsv[1], color.hsv[2]);
        document.getElementById('color-dot').style.background = color.hex;
    },
});
//# sourceMappingURL=colorwheel.js.map