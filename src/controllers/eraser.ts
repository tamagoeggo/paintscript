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

        let brushes = document.getElementsByClassName("brushcontainer");
        for (let i = 0; i < brushes.length; i++){
            (<HTMLElement>brushes[i]).style.background = '#A6A6A6';
        }

        (<HTMLImageElement>document.getElementById("eraser")).classList.add('active');
        (<HTMLImageElement>document.getElementById("paintbrush")).classList.remove('active');
        (<HTMLImageElement>document.getElementById("eraser")).src = "/images/eraser-button-active.svg";
        (<HTMLImageElement>document.getElementById("paintbrush")).src = "/images/paintbrush-button.svg";
    }

}
