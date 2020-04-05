import { colorWheel } from "./colorwheel.js";
import * as colors from "./colors.js";
import { Eraser } from "./eraser.js";
import { Paintbrush } from "./paintbrush.js";
import * as windows from "./window.js";

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

    private clickXHistory: number[] = [];
    private clickYHistory: number[] = [];
    private clickDragHistory: boolean[] = [];
    private colorHistory: string[] = [];
    private drawingModeHistory: string[] = [];
    private brushSizeHistory: number[] = [];

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
    
        //document.getElementById('clear').addEventListener("click", this.clearEventHandler);
    }

    // lets user draw on canvas
    private redraw() {
        let clickX = this.clickX;
        let context = this.context;
        let clickDrag = this.clickDrag;
        let clickY = this.clickY;
        let color = this.color;
        let drawingMode = this.drawingMode;
        let brushSize = this.brushSize;

        //console.log(brushSize);

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
            // console.log("usedColors:", colors.usedColors);
        }

        context.closePath();        
    }

    private addClick(x: number, y: number,  dragging: boolean, color: string, mode: string, size: number) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
        this.color.push(color);
        this.drawingMode.push(mode);
        this.brushSize.push(size);
    }
    
    private clearEventHandler = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
    }
    
    private releaseEventHandler = () => {
        this.paint = false;
        this.redraw(); // final redraw call
        this.clickXHistory = this.clickXHistory.concat(this.clickX);
        this.clickYHistory = this.clickYHistory.concat(this.clickY);
        this.clickDragHistory = this.clickDragHistory.concat(this.clickDrag);
        this.colorHistory = this.colorHistory.concat(this.color);
        this.drawingModeHistory = this.drawingModeHistory.concat(this.drawingMode);
        this.brushSizeHistory = this.brushSizeHistory.concat(this.brushSize);
       
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
        this.color = [];
        this.drawingMode = [];
        this.brushSize = [];
        
        colors.removeUsedColors();
        colors.generateUsedColors(colors.usedColors);
        colors.getColorFromHistory();

        // console.log("paintbrush size: " + paintbrush.getBrushSize);
        // console.log("paintbrush brush: " + paintbrush.getBrush);
    }
    
    private cancelEventHandler = () => {
        this.paint = false;
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
}

export const mode = { isdrawingmode: true };

document.getElementById('eraserwindow').style.display = 'none';
document.getElementById('brushwindow').style.display = 'none';

new DrawingApp();

