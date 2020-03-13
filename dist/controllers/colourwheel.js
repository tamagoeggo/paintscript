"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reinvented-color-wheel/css/reinvented-color-wheel.min.css");
var reinvented_color_wheel_1 = __importDefault(require("reinvented-color-wheel"));
// create a new color picker
exports.colorWheel = new reinvented_color_wheel_1.default({
    // appendTo is the only required property. specify the parent element of the color wheel.
    appendTo: document.getElementById('colourpickercontainer'),
    // followings are optional properties and their default values.
    // initial color (can be specified in hsv / hsl / rgb / hex)
    hsv: [0, 100, 100],
    // hsl: [0, 100, 50],
    // rgb: [255, 0, 0],
    // hex: "#ff0000",
    // appearance
    wheelDiameter: 200,
    wheelThickness: 20,
    handleDiameter: 16,
    wheelReflectsSaturation: true,
    // handler
    onChange: function (color) {
        // the only argument is the ReinventedColorWheel instance itself.
        // console.log("hsv:", color.hsv[0], color.hsv[1], color.hsv[2]);
    },
});
// // set color in HSV / HSL / RGB / HEX
// colorWheel.rgb = [255, 128, 64];
// colorWheel.hsl = [120, 100, 50];
// colorWheel.hsv = [240, 100, 100];
// colorWheel.hex = '#888888';
// // get color in HSV / HSL / RGB / HEX
// console.log("hsv:", colorWheel.hsv[0], colorWheel.hsv[1], colorWheel.hsv[2]);
// console.log("hsl:", colorWheel.hsl[0], colorWheel.hsl[1], colorWheel.hsl[2]);
// console.log("rgb:", colorWheel.rgb[0], colorWheel.rgb[1], colorWheel.rgb[2]);
// console.log("hex:", colorWheel.hex);
// // please call redraw() after changing some appearance properties.
// colorWheel.wheelDiameter = 400;
// colorWheel.wheelThickness = 40;
// colorWheel.redraw();
//# sourceMappingURL=colourwheel.js.map