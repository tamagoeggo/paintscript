"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("./index.js");
var Paintbrush = /** @class */ (function () {
    function Paintbrush() {
        var _this = this;
        this.size = 10;
        this.changeBrushSize = function () {
            var slider = document.getElementById("brushslider");
            _this.size = Number(slider.value) || 10;
        };
        this.changeBrushType = function (e) {
            var selectedBrush = document.getElementById(e.target.id);
            var otherBrushes = document.getElementsByClassName("brushcontainer");
            index_js_1.mode.isdrawingmode = true;
            for (var i = 0; i < otherBrushes.length; i++) {
                otherBrushes[i].style.background = '#A6A6A6';
            }
            selectedBrush.style.background = "#4FA2EE";
            _this.brush = e.target.id;
            var erasers = document.getElementsByClassName("erasercontainer");
            for (var i = 0; i < erasers.length; i++) {
                erasers[i].style.background = '#A6A6A6';
            }
            document.getElementById("paintbrush").classList.add('active');
            document.getElementById("eraser").classList.remove('active');
            document.getElementById("paintbrush").src = "/images/paintbrush-button-active.svg";
            document.getElementById("eraser").src = "/images/eraser-button.svg";
        };
        document.getElementById("normalbrush").style.background = '#4FA2EE';
        this.createUserEvents();
    }
    Object.defineProperty(Paintbrush.prototype, "getBrushSize", {
        get: function () {
            return this.size || 10;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(Paintbrush.prototype, "getBrush", {
        get: function () {
            return this.brush;
        },
        enumerable: true,
        configurable: true
    });
    Paintbrush.prototype.createUserEvents = function () {
        var slider = document.getElementById("brushslider");
        slider.addEventListener("input", this.changeBrushSize);
        var brush = document.getElementsByClassName("brushcontainer");
        for (var i = 0; i < brush.length; i++) {
            brush[i].addEventListener("click", this.changeBrushType);
        }
    };
    return Paintbrush;
}());
exports.Paintbrush = Paintbrush;
//# sourceMappingURL=paintbrush.js.map