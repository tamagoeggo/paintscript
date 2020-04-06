export function closeWindows(){
    let openWindows = document.getElementsByClassName('side-window');
    for (let i = 0; i < openWindows.length; i++) {        
        (<HTMLElement>openWindows[i]).style.display = 'none';        
    }
    let pressedButtons = document.getElementsByClassName('side-buttons')
    for (let i = 0; i < pressedButtons.length; i++) {        
        (<HTMLElement>pressedButtons[i]).style.boxShadow = '-3px -3px 8px #FFFFFF, 3px 3px 8px rgba(201, 201, 201, 0.5)';
        pressedButtons[i].classList.remove("pressed");
    }
}

// toggle windows 
let sideButtons = document.getElementsByClassName('side-buttons');
let windowId = '';
for (let i = 0; i < sideButtons.length; i++){
    sideButtons[i].addEventListener('mousedown', () => {
        let clickedButton = sideButtons[i];
        clickedButton.classList.add("pressed");

        if (clickedButton.id == 'color-button'){
            windowId = 'colourwindow';
        }
        else if (clickedButton.id == 'paintbrush-button'){
            windowId = 'brushwindow';
        }
        else if (clickedButton.id == 'eraser-button'){
            windowId = 'eraserwindow';
        }
        else {
            windowId = '';
        }

        let selectedWindow = document.getElementById(windowId);
        // close if opened
        if (selectedWindow.style.display !== 'none') {
            selectedWindow.style.display = 'none';
            document.getElementById(clickedButton.id).style.boxShadow = '-3px -3px 8px #FFFFFF, 3px 3px 8px rgba(201, 201, 201, 0.5)';
            clickedButton.classList.remove("pressed");
        }
        // open if closed
        else {
            let openWindows = document.getElementsByClassName("side-window");
            for (let i = 0; i < openWindows.length; i++) {        
                (<HTMLElement>openWindows[i]).style.display = 'none';
            }
            let pressedButtons = document.getElementsByClassName('side-buttons')
            for (let i = 0; i < pressedButtons.length; i++) {        
                (<HTMLElement>pressedButtons[i]).style.boxShadow = '-3px -3px 8px #FFFFFF, 3px 3px 8px rgba(201, 201, 201, 0.5)';
                pressedButtons[i].classList.remove("pressed");
            }
            selectedWindow.style.display = 'block';
            document.getElementById(clickedButton.id).style.boxShadow = 'inset 3px 3px 8px #474747, inset -3px -3px 8px rgba(165, 165, 165, 0.5)';
            clickedButton.classList.add("pressed");
        }
    });

    sideButtons[i].addEventListener('mouseup', () =>{
        let clickedButton = sideButtons[i];
        if (clickedButton.classList.contains('pressed')) {
            (<HTMLImageElement>clickedButton).style.boxShadow = "inset 3px 3px 8px #474747, inset -3px -3px 8px rgba(165, 165, 165, 0.5)";
        } 
    });

    sideButtons[i].addEventListener('mouseover', () => {
        let hoverButton = sideButtons[i];
        (<HTMLElement>hoverButton).style.background = "#6C6C6C";

        if (hoverButton.id == 'paintbrush-button'){
            (<HTMLImageElement>document.getElementById("paintbrush")).src = "/images/paintbrush-button-hover.svg";
        }
        else if (hoverButton.id == 'eraser-button'){
            (<HTMLImageElement>document.getElementById("eraser")).src = "/images/eraser-button-hover.svg";
        }
        
        if (hoverButton.classList.contains('pressed')) {
            (<HTMLElement>hoverButton).style.boxShadow = "inset 3px 3px 8px #474747, inset -3px -3px 8px rgba(165, 165, 165, 0.5)";
        }
    });

    sideButtons[i].addEventListener('mouseout', () => {
        let button = sideButtons[i];
        (<HTMLElement>button).style.background = "#EFEFEF";

        if (button.id == 'paintbrush-button'){
            let paintbrush = <HTMLImageElement>document.getElementById("paintbrush");
            if (paintbrush.classList.contains('active')){
                paintbrush.src = "/images/paintbrush-button-active.svg";
            }
            else {
                paintbrush.src = "/images/paintbrush-button.svg";
            }
        }
        else if (button.id == 'eraser-button'){
            let eraser = <HTMLImageElement>document.getElementById("eraser");
            if (eraser.classList.contains('active')){
                eraser.src = "/images/eraser-button-active.svg";
            }
            else {
                eraser.src = "/images/eraser-button.svg";
            }
        }
        
        if (button.classList.contains('pressed')) {
            (<HTMLElement>button).style.boxShadow = "inset 3px 3px 8px #DADADA, inset -3px -3px 8px rgba(255, 255, 255, 0.5)";
        }
    });
}

// side button hover
