import { colorWheel } from "./colorwheel.js";
import * as colors from "./colors.js";
import { Eraser } from "./eraser.js";
import { Paintbrush } from "./paintbrush.js";
import * as windows from "./window.js";
import { normalBrush } from "./brushes/normalbrush.js";

export class DrawingApp{
    private canvas: HTMLCanvasElement;
    private eraser: Eraser;
    private paintbrush: Paintbrush;
    private context: CanvasRenderingContext2D;
    private paint: boolean;

    private clickX: number[] = [];
    private clickY: number[] = [];
    private clickDrag: boolean[] = [];
    private color: string[] = [];
    private drawingMode: string[] = [];
    private brushSize: number[] = [];

    // undo
    private clickXHistory: number[][] = [];
    private clickYHistory: number[][] = [];
    private clickDragHistory: boolean[][] = [];
    private colorHistory: string[][] = [];
    private drawingModeHistory: string[][] = [];
    private brushSizeHistory: number[][] = [];

    // redo
    private clickXRedo: number[][] = [];
    private clickYRedo: number[][] = [];
    private clickDragRedo: boolean[][] = [];
    private colorRedo: string[][] = [];
    private drawingModeRedo: string[][] = [];
    private brushSizeRedo: number[][] = [];

    constructor(){
        this.eraser =  new Eraser();
        this.paintbrush = new Paintbrush();

        let canvas = document.getElementById('drawCanvas') as HTMLCanvasElement;
        let context = canvas.getContext("2d");
        context.canvas.width  = window.innerWidth;
        context.canvas.height = window.innerHeight;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = 'black';
        //context.lineWidth = 10;        

        let width = document.getElementById('drawCanvas').scrollWidth;
        let height = document.getElementById('drawCanvas').scrollHeight;
        this.canvas = canvas;
        this.context = context;
        this.createUserEvents();
    }

    // set up handlers for canvas events
    // register both mouse and touch events
    public createUserEvents() {
        let canvas = this.canvas;
    
        canvas.addEventListener("mousedown", this.pressEventHandler);
        canvas.addEventListener("mousemove", this.dragEventHandler);
        canvas.addEventListener("mouseup", this.releaseEventHandler);
        canvas.addEventListener("mouseout", this.cancelEventHandler);
    
        canvas.addEventListener("touchstart", this.pressEventHandler);
        canvas.addEventListener("touchmove", this.dragEventHandler);
        canvas.addEventListener("touchend", this.releaseEventHandler);
        canvas.addEventListener("touchcancel", this.cancelEventHandler);

        document.getElementById('undo').addEventListener("click", this.undo);
        document.getElementById('redo').addEventListener("click", this.redo);
    
        //document.getElementById('clear').addEventListener("click", this.clearEventHandler);
    }

    // lets user draw on canvas
    private redraw() {
        let context = this.context;
        let clickX = this.clickX;    
        let clickY = this.clickY;    
        let clickDrag = this.clickDrag;        
        let color = this.color;
        let drawingMode = this.drawingMode;
        let brushSize = this.brushSize;

        let brushType = this.paintbrush.getBrush;

        if (brushType == "normalbrush"){
            normalBrush(context, clickX, clickY, clickDrag, color, drawingMode, brushSize);
        }
        else {
            for (let i = 0; i < clickX.length; ++i) {
                context.beginPath();
                context.strokeStyle = color[i];
                context.globalCompositeOperation = drawingMode[i];
                context.lineWidth = brushSize[i];

                if (clickDrag[i] && i) {
                    context.moveTo(clickX[i - 1], clickY[i - 1]);
                } else {
                    context.moveTo(clickX[i] - 1, clickY[i]);
                }
                context.lineTo(clickX[i], clickY[i]);
                context.stroke();
            }

            if(colors.usedColors.indexOf(colorWheel.hex) == -1){            
                colors.usedColors.unshift(colorWheel.hex);
            }

            context.closePath();      
        }  
    }

    private addClick(x: number, y: number,  dragging: boolean, color: string, mode: string, size: number) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
        this.color.push(color);
        this.drawingMode.push(mode);
        this.brushSize.push(size);
    }
    
    private addClickHistory(x: number[], y: number[],  dragging: boolean[], color: string[], mode: string[], size: number[]) {
        this.clickXHistory.push(x);
        this.clickYHistory.push(y);
        this.clickDragHistory.push(dragging);
        this.colorHistory.push(color);
        this.drawingModeHistory.push(mode);
        this.brushSizeHistory.push(size);
    }

    private clearCurrentClicks = () => {
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
        this.color = [];
        this.drawingMode = [];
        this.brushSize = [];
    }

    private cancelEventHandler = () => {
        this.paint = false;
    }
    
    private releaseEventHandler = () => {
        this.paint = false;
        this.redraw(); // final redraw call
        this.addClickHistory(this.clickX, this.clickY, this.clickDrag, this.color, this.drawingMode, this.brushSize);
        this.clearCurrentClicks();
        
        colors.removeUsedColors();
        colors.generateUsedColors(colors.usedColors);
        colors.getColorFromHistory();

        this.toggleUndoRedo();
    }
    
    // initial click/touch
    private pressEventHandler = (e: MouseEvent | TouchEvent) => {
        let drawingMode = "source-over";
        let size = this.paintbrush.getBrushSize;
        if(!mode.isdrawingmode){
            drawingMode = "destination-out";
            size = this.eraser.getEraserSize;
        }

        let mouseX = (e as TouchEvent).changedTouches ?
                     (e as TouchEvent).changedTouches[0].pageX :
                     (e as MouseEvent).pageX;
        let mouseY = (e as TouchEvent).changedTouches ?
                     (e as TouchEvent).changedTouches[0].pageY :
                     (e as MouseEvent).pageY;
        mouseX -= this.canvas.offsetLeft;
        mouseY -= this.canvas.offsetTop;
    
        this.paint = true;
        this.addClick(mouseX, mouseY, false, colorWheel.hex, drawingMode, size);
        this.redraw();
        windows.closeWindows(); 

        if(this.clickXRedo != [] &&
        this.clickYRedo != [] &&
        this.clickDragRedo != [] &&
        this.colorRedo != [] &&
        this.drawingModeRedo != [] &&
        this.brushSizeRedo != []){
            this.clearRedo();
        }     
        
        this.toggleUndoRedo();
    }

    // moving of cursor/touch while in down state
    private dragEventHandler = (e: MouseEvent | TouchEvent) => {
        let drawingMode = "source-over";
        let size = this.paintbrush.getBrushSize;
        if(!mode.isdrawingmode){
            drawingMode = "destination-out"; 
            size = this.eraser.getEraserSize;           
        }

        let mouseX = (e as TouchEvent).changedTouches ?
                     (e as TouchEvent).changedTouches[0].pageX :
                     (e as MouseEvent).pageX;
        let mouseY = (e as TouchEvent).changedTouches ?
                     (e as TouchEvent).changedTouches[0].pageY :
                     (e as MouseEvent).pageY;
        mouseX -= this.canvas.offsetLeft; // transforms xcoordinates relative to canvas
        mouseY -= this.canvas.offsetTop; // transforms ycoordinates relative to canvas
    
        if (this.paint) {
            this.addClick(mouseX, mouseY, true, colorWheel.hex, drawingMode, size); 
            this.redraw(); 
        }
    }

    private undo = () => {
        let lastClickX = this.clickXHistory.pop();
        let lastClickY = this.clickYHistory.pop();
        let lastClickDrag = this.clickDragHistory.pop();
        let lastColor = this.colorHistory.pop();
        let lastDrawingMode = this.drawingModeHistory.pop();
        let lastBrushSize = this.brushSizeHistory.pop();

        // move last stroke to redo to save for later
        if (lastClickX != undefined) {
            this.clickXRedo.push(lastClickX);
            this.clickYRedo.push(lastClickY);
            this.clickDragRedo.push(lastClickDrag);
            this.colorRedo.push(lastColor);
            this.drawingModeRedo.push(lastDrawingMode);
            this.brushSizeRedo.push(lastBrushSize);

            this.clickX = [].concat.apply([], this.clickXHistory);
            this.clickY = [].concat.apply([], this.clickYHistory);
            this.clickDrag = [].concat.apply([], this.clickDragHistory);
            this.color = [].concat.apply([], this.colorHistory);
            this.drawingMode = [].concat.apply([], this.drawingModeHistory);
            this.brushSize = [].concat.apply([], this.brushSizeHistory);

            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.redraw();
        }

        this.toggleUndoRedo();
    }

    private redo = () => {
        let lastClickX = this.clickXRedo.pop();
        let lastClickY = this.clickYRedo.pop();
        let lastClickDrag = this.clickDragRedo.pop();
        let lastColor = this.colorRedo.pop();
        let lastDrawingMode = this.drawingModeRedo.pop();
        let lastBrushSize = this.brushSizeRedo.pop();

        if (lastClickX != undefined){
            this.clickX = this.clickX.concat(lastClickX);
            this.clickY = this.clickY.concat(lastClickY);
            this.clickDrag = this.clickDrag.concat(lastClickDrag);
            this.color = this.color.concat(lastColor);
            this.drawingMode = this.drawingMode.concat(lastDrawingMode);
            this.brushSize = this.brushSize.concat(lastBrushSize);

            this.addClickHistory(lastClickX, lastClickY,  lastClickDrag, lastColor, lastDrawingMode, lastBrushSize);

            this.redraw();
        }

        this.toggleUndoRedo();
    }

    private clearRedo = () => {
        this.clickXRedo = [];
        this.clickYRedo = [];
        this.clickDragRedo = [];
        this.colorRedo = [];
        this.drawingModeRedo = [];
        this.brushSizeRedo = [];
    }

    private toggleUndoRedo = () => {
        // redo
        let redo = document.getElementById("redo");
        if (this.clickXRedo !== undefined || this.clickXRedo.length != 0){
            (<HTMLImageElement>document.getElementById("redoimg")).src = "/images/redo.svg";            
            redo.classList.add("undo-redo-active");
        }
        if (this.clickXRedo === undefined || this.clickXRedo.length == 0){
            (<HTMLImageElement>document.getElementById("redoimg")).src = "/images/redo-inactive.svg";
            redo.classList.remove("undo-redo-active");
        }

        // undo
        let undo = document.getElementById("undo");
        if (this.clickXHistory !== undefined || this.clickXHistory.length != 0){
            (<HTMLImageElement>document.getElementById("undoimg")).src = "/images/undo.svg";
            undo.classList.add("undo-redo-active");
        }
        if (this.clickXHistory === undefined || this.clickXHistory.length == 0){
            (<HTMLImageElement>document.getElementById("undoimg")).src = "/images/undo-inactive.svg";
            undo.classList.remove("undo-redo-active");
        }
        
        // hover
        // redo.addEventListener('mouseover', () => {
        //     if (this.clickXRedo !== undefined || this.clickXRedo.length != 0){
        //         redo.classList.remove("unpressed");
        //         redo.classList.remove("hovering-pressed");
        //         redo.classList.add("hovering-unpressed");
        //         (<HTMLImageElement>document.getElementById("redoimg")).src = "/images/redo-hover.svg";
        //     }
        //     else{
        //         (<HTMLImageElement>document.getElementById("redoimg")).src = "/images/redo-inactive.svg";
        //     }
        // });

        // redo.addEventListener('mouseout', () => {
        //     if (this.clickXRedo !== undefined || this.clickXRedo.length != 0){
        //         redo.classList.remove("hovering-unpressed");
        //         redo.classList.remove("hovering-pressed");
        //         redo.classList.add("unpressed");
        //     }
        // });

        // redo.addEventListener('mousedown', () => {
        //     if (this.clickXRedo !== undefined || this.clickXRedo.length != 0){
        //         redo.classList.remove("unpressed");
        //         redo.classList.remove("hovering-unpressed");
        //         redo.classList.add("hovering-pressed");
        //     }
        // });

        // redo.addEventListener('mouseup', () => {
        //     if (this.clickXRedo !== undefined || this.clickXRedo.length != 0){
        //         redo.classList.remove("unpressed");
        //         redo.classList.remove("hovering-pressed");
        //         redo.classList.add("hovering-unpressed");
        //     }
        // });
    }
}

export const mode = { isdrawingmode: true };

document.getElementById('eraserwindow').style.display = 'none';
document.getElementById('brushwindow').style.display = 'none';

new DrawingApp();

