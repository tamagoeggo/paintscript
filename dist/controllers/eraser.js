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
// toggle eraser window
document.getElementById('eraser-button').addEventListener('click', function () {
    var eraserwindow = document.getElementById("eraserwindow");
    if (eraserwindow.style.display !== 'none') {
        eraserwindow.style.display = 'none';
        document.getElementById('eraser-button').style.boxShadow = '-3px -3px 8px #FFFFFF, 3px 3px 8px rgba(201, 201, 201, 0.5)';
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
        eraserwindow.style.display = 'block';
        document.getElementById('eraser-button').style.boxShadow = 'inset 3px 3px 8px #DADADA, inset -3px -3px 8px rgba(255, 255, 255, 0.5)';
    }
});
//# sourceMappingURL=eraser.js.map