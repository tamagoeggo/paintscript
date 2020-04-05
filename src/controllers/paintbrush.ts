import { mode } from "./index.js";

export class Paintbrush{
    private size: number = 10;
    private brush: string;
    
    public get getBrushSize(): number {
        return this.size || 10;
    };

    public get getBrush(): string {
        return this.brush;
    }

    constructor(){     
        this.createUserEvents();
    }

    public createUserEvents() {
        let slider = document.getElementById("brushslider") as HTMLInputElement;
        slider.addEventListener("input", this.changeBrushSize);

        let brush = document.getElementsByClassName("brushcontainer");
        for (let i = 0; i < brush.length; i++) {  
            (<HTMLElement>brush[i]).addEventListener("click", this.changeBrushType);
        }
    }

    private changeBrushSize = () => {
        let slider = document.getElementById("brushslider") as HTMLInputElement;
        this.size = Number(slider.value) || 10;
    }

    private changeBrushType = (e) => {
        let selectedBrush = document.getElementById(e.target.id);
        let otherBrushes = document.getElementsByClassName("brushcontainer");
        mode.isdrawingmode = true;

        for (let i = 0; i < otherBrushes.length; i++){
            (<HTMLElement>otherBrushes[i]).style.background = '#A6A6A6';
        }
        selectedBrush.style.background = "#4FA2EE";
        this.brush = e.target.id;
    }

}

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
