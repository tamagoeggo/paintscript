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
        };
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
// toggle brush window
document.getElementById('paintbrush-button').addEventListener('click', function () {
    var brushwindow = document.getElementById("brushwindow");
    if (brushwindow.style.display !== 'none') {
        brushwindow.style.display = 'none';
        document.getElementById('paintbrush-button').style.boxShadow = '-3px -3px 8px #FFFFFF, 3px 3px 8px rgba(201, 201, 201, 0.5)';
    }
    else {
        var openWindows = document.getElementsByClassName("side-window");
        for (var i = 0; i < openWindows.length; i++) {
            openWindows[i].style.display = 'none';
        }
        var pressedButtons = document.getElementsByClassName('side-buttons');
        for (var i = 0; i < pressedButtons.length; i++) {
            pressedButtons[i].style.boxShadow = '-3px -3px 8px #FFFFFF, 3px 3px 8px rgba(201, 201, 201, 0.5)';
        }
        brushwindow.style.display = 'block';
        document.getElementById('paintbrush-button').style.boxShadow = 'inset 3px 3px 8px #DADADA, inset -3px -3px 8px rgba(255, 255, 255, 0.5)';
    }
});
//# sourceMappingURL=paintbrush.js.map