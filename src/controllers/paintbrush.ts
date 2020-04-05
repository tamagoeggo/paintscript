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
        document.getElementById("normalbrush").style.background = '#4FA2EE';
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

        let erasers = document.getElementsByClassName("erasercontainer");
        for (let i = 0; i < erasers.length; i++){
            (<HTMLElement>erasers[i]).style.background = '#A6A6A6';
        }

        (<HTMLImageElement>document.getElementById("paintbrush")).src = "/images/paintbrush-button-active.svg";
        (<HTMLImageElement>document.getElementById("eraser")).src = "/images/eraser-button.svg";
    }

}
