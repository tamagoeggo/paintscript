"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("./index.js");
var Eraser = /** @class */ (function () {
    function Eraser() {
        var _this = this;
        this.size = 10;
        this.changeEraserSize = function () {
            var slider = document.getElementById("eraserslider");
            _this.size = Number(slider.value) || 10;
        };
        this.changeEraserType = function (e) {
            var selectedEraser = document.getElementById(e.target.id);
            var otherErasers = document.getElementsByClassName("erasercontainer");
            index_js_1.mode.isdrawingmode = false;
            for (var i = 0; i < otherErasers.length; i++) {
                otherErasers[i].style.background = '#A6A6A6';
            }
            selectedEraser.style.background = "#4FA2EE";
            _this.brush = e.target.id;
            var brushes = document.getElementsByClassName("brushcontainer");
            for (var i = 0; i < brushes.length; i++) {
                brushes[i].style.background = '#A6A6A6';
            }
            document.getElementById("eraser").src = "/images/eraser-button-active.svg";
            document.getElementById("paintbrush").src = "/images/paintbrush-button.svg";
        };
        this.createUserEvents();
    }
    Object.defineProperty(Eraser.prototype, "getEraserSize", {
        get: function () {
            return this.size || 10;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Eraser.prototype, "getBrush", {
        get: function () {
            return this.brush;
        },
        enumerable: true,
        configurable: true
    });
    Eraser.prototype.createUserEvents = function () {
        var slider = document.getElementById("eraserslider");
        slider.addEventListener("input", this.changeEraserSize);
        var eraser = document.getElementsByClassName("erasercontainer");
        for (var i = 0; i < eraser.length; i++) {
            eraser[i].addEventListener("click", this.changeEraserType);
        }
    };
    return Eraser;
}());
exports.Eraser = Eraser;
//# sourceMappingURL=eraser.js.map