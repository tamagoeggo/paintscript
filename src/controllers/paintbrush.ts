import { mode } from "./index.js";

// toggle brush window
document.getElementById('paintbrush-button').addEventListener('click', () => {
    let brushwindow = document.getElementById("brushwindow");
    if (brushwindow.style.display !== 'none') {
        brushwindow.style.display = 'none';
        document.getElementById('paintbrush-button').style.boxShadow = '-3px -3px 8px #FFFFFF, 3px 3px 8px rgba(201, 201, 201, 0.5)';
    }
    else {
        let openWindows = document.getElementsByClassName("side-window");
        for (let i = 0; i < openWindows.length; i++) {        
            (<HTMLElement>openWindows[i]).style.display = 'none';
        }
        let pressedButtons = document.getElementsByClassName('side-buttons')
        for (let i = 0; i < pressedButtons.length; i++) {        
            (<HTMLElement>pressedButtons[i]).style.boxShadow = '-3px -3px 8px #FFFFFF, 3px 3px 8px rgba(201, 201, 201, 0.5)'
        }
        brushwindow.style.display = 'block';
        document.getElementById('paintbrush-button').style.boxShadow = 'inset 3px 3px 8px #DADADA, inset -3px -3px 8px rgba(255, 255, 255, 0.5)';
    }
});


// paintbrush selection
let brush = document.getElementsByClassName("brushcontainer");
for (let i = 0; i < brush.length; i++) {        
    brush[i].addEventListener('click', () => {
        let selectedBrush = brush[i];
        mode.drawingmode = true;
        for (let i = 0; i < brush.length; i++){
            (<HTMLElement>brush[i]).style.background = '#A6A6A6';
        }
        (<HTMLElement>selectedBrush).style.background = '#4FA2EE';
    });
}

// eraser size
let slider = document.getElementById("brushslider") as HTMLInputElement;
slider.oninput = function() {        
    let canvas = document.getElementById('drawCanvas') as HTMLCanvasElement;
    let context = canvas.getContext("2d");
    context.lineWidth = Number(slider.value) || 10;
}

let brushType = null;
export function getBrushType(){
}
