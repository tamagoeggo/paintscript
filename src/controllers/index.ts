export class DrawingApp{
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private paint: boolean;

    private clickX: number[] = [];
    private clickY: number[] = [];
    private clickDrag: boolean[] = [];

    private width: number;
    private height: number;

    constructor(){
        let canvas = document.getElementById('drawCanvas') as HTMLCanvasElement;
        let context = canvas.getContext("2d");
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 1;

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
    
        document.getElementById('clear').addEventListener("click", this.clearEventHandler);
    }

    // lets user draw on canvas
    private redraw() {
        let clickX = this.clickX;
        let context = this.context;
        let clickDrag = this.clickDrag;
        let clickY = this.clickY;
        for (let i = 0; i < clickX.length; ++i) {
            context.beginPath();
            if (clickDrag[i] && i) {
                context.moveTo(clickX[i - 1], clickY[i - 1]);
            } else {
                context.moveTo(clickX[i] - 1, clickY[i]);
            }
            context.lineTo(clickX[i], clickY[i]);
            context.stroke();
        }
        context.closePath();
    }

    private addClick(x: number, y: number, dragging: boolean) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.clickDrag.push(dragging);
    }
    
    private clearEventHandler = () => {
        this.context
            .clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.clickX = [];
        this.clickY = [];
        this.clickDrag = [];
    }
    
    private releaseEventHandler = () => {
        this.paint = false;
        this.redraw(); // final redraw call
    }
    
    private cancelEventHandler = () => {
        this.paint = false;
    }

    // initial click/touch
    private pressEventHandler = (e: MouseEvent | TouchEvent) => {
        let mouseX = (e as TouchEvent).changedTouches ?
                     (e as TouchEvent).changedTouches[0].pageX :
                     (e as MouseEvent).pageX;
        let mouseY = (e as TouchEvent).changedTouches ?
                     (e as TouchEvent).changedTouches[0].pageY :
                     (e as MouseEvent).pageY;
        mouseX -= this.canvas.offsetLeft;
        mouseY -= this.canvas.offsetTop;
    
        this.paint = true;
        this.addClick(mouseX, mouseY, false);
        this.redraw();
    }

    // moving of cursor/touch while in down state
    private dragEventHandler = (e: MouseEvent | TouchEvent) => {
        let mouseX = (e as TouchEvent).changedTouches ?
                     (e as TouchEvent).changedTouches[0].pageX :
                     (e as MouseEvent).pageX;
        let mouseY = (e as TouchEvent).changedTouches ?
                     (e as TouchEvent).changedTouches[0].pageY :
                     (e as MouseEvent).pageY;
        mouseX -= this.canvas.offsetLeft; // transforms xcoordinates relative to canvas
        mouseY -= this.canvas.offsetTop; // transforms ycoordinates relative to canvas
    
        if (this.paint) {
            this.addClick(mouseX, mouseY, true); 
            this.redraw(); 
        }
        e.preventDefault();
    }
}

// document.onreadystatechange = () => {
//     new DrawingApp();
// }
new DrawingApp();