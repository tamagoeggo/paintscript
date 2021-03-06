import "reinvented-color-wheel/css/reinvented-color-wheel.min.css";
import ReinventedColorWheel from "reinvented-color-wheel";

// create a new color picker
export var colorWheel = new ReinventedColorWheel({
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
