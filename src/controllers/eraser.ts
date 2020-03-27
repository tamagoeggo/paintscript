export function toggleEraserWindow(){
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
} 

