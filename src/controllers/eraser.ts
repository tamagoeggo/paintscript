import { mode } from "./index.js";

export class Eraser{
    private size: number;
    
}

// toggle eraser window
document.getElementById('eraser-button').addEventListener('click', () => {
    let eraserwindow = document.getElementById("eraserwindow");
    if (eraserwindow.style.display !== 'none') {
        eraserwindow.style.display = 'none';
        document.getElementById('eraser-button').style.boxShadow = '-3px -3px 8px #FFFFFF, 3px 3px 8px rgba(201, 201, 201, 0.5)';
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
        eraserwindow.style.display = 'block';
        document.getElementById('eraser-button').style.boxShadow = 'inset 3px 3px 8px #DADADA, inset -3px -3px 8px rgba(255, 255, 255, 0.5)';
    }
});


// eraser selection
let eraser = document.getElementsByClassName("erasercontainer");
for (let i = 0; i < eraser.length; i++) {        
    eraser[i].addEventListener('click', () => {
        let selectedEraser = eraser[i];
        mode.drawingmode = false;
        for (let i = 0; i < eraser.length; i++){
            (<HTMLElement>eraser[i]).style.background = '#A6A6A6';
        }
        (<HTMLElement>selectedEraser).style.background = '#4FA2EE';
    });
}

// eraser size
let slider = document.getElementById("eraserslider") as HTMLInputElement;
slider.oninput = function() {        
    let canvas = document.getElementById('drawCanvas') as HTMLCanvasElement;
    let context = canvas.getContext("2d");
    context.lineWidth = Number(slider.value) || 10;
}

let eraserType = null;
export function getEraserType(){
}
