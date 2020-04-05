import { mode } from "./index.js";

export class Eraser{
    private size: number = 10;
    private brush: string;
    
    public get getEraserSize(): number {
        return this.size || 10;
    };

    public get getBrush(): string {
        return this.brush;
    }

    constructor(){     
        this.createUserEvents();
    }

    public createUserEvents() {
        let slider = document.getElementById("eraserslider") as HTMLInputElement;
        slider.addEventListener("input", this.changeEraserSize);

        let eraser = document.getElementsByClassName("erasercontainer");
        for (let i = 0; i < eraser.length; i++) {  
            (<HTMLElement>eraser[i]).addEventListener("click", this.changeEraserType);
        }
    }

    private changeEraserSize = () => {
        let slider = document.getElementById("eraserslider") as HTMLInputElement;
        this.size = Number(slider.value) || 10;
    }

    private changeEraserType = (e) => {
        let selectedEraser = document.getElementById(e.target.id);
        let otherErasers = document.getElementsByClassName("erasercontainer");
        mode.isdrawingmode = false;

        for (let i = 0; i < otherErasers.length; i++){
            (<HTMLElement>otherErasers[i]).style.background = '#A6A6A6';
        }
        selectedEraser.style.background = "#4FA2EE";
        this.brush = e.target.id;
    }

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
