import * as colors from "../colors.js";
import { colorWheel } from "../colorwheel.js";

export function normalBrush(context: CanvasRenderingContext2D, clickX: number[], clickY: number[], clickDrag: boolean[], 
    color: string[], drawingMode: string[], brushSize: number[]) {      
    
    context.moveTo(clickX[0], clickY[0]);

    for (let i = 0; i < clickX.length - 2; ++i) {
        context.beginPath();
        context.strokeStyle = color[i];
        context.globalCompositeOperation = drawingMode[i];
        context.lineWidth = brushSize[i];  

        let xc = (clickX[i] + clickX[i + 1]) / 2;
        let yc = (clickY[i] + clickY[i + 1]) / 2;
        context.quadraticCurveTo(clickX[i], clickY[i], xc, yc);
    }

    context.quadraticCurveTo(clickX[clickX.length - 2], clickY[clickY.length - 2], clickX[clickX.length - 1], clickY[clickY.length - 1]);
    context.stroke();
    context.closePath();   

    if(colors.usedColors.indexOf(colorWheel.hex) == -1){            
        colors.usedColors.unshift(colorWheel.hex);
    }
}