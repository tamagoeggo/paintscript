export function closeWindows(){
    let openWindows = document.getElementsByClassName('side-window');
    for (let i = 0; i < openWindows.length; i++) {        
        (<HTMLElement>openWindows[i]).style.display = 'none';        
    }
    let pressedButtons = document.getElementsByClassName('side-buttons')
    for (let i = 0; i < pressedButtons.length; i++) {        
        pressedButtons[i].classList.remove("pressed");
        pressedButtons[i].classList.add("unpressed");
    }
}

// toggle windows 
let sideButtons = document.getElementsByClassName('side-buttons');
let windowId = '';
for (let i = 0; i < sideButtons.length; i++){
    sideButtons[i].addEventListener('mouseover', () => {
        let hoverButton = sideButtons[i];

        if (hoverButton.classList.contains('pressed')) {
            hoverButton.classList.remove("pressed");
            hoverButton.classList.add("hovering-pressed");
        }
        else if (hoverButton.classList.contains('unpressed')){
            hoverButton.classList.remove("unpressed");
            hoverButton.classList.add("hovering-unpressed");
        }

        if (hoverButton.id == 'paintbrush-button'){
            (<HTMLImageElement>document.getElementById("paintbrush")).src = "/images/paintbrush-button-hover.svg";
        }
        else if (hoverButton.id == 'eraser-button'){
            (<HTMLImageElement>document.getElementById("eraser")).src = "/images/eraser-button-hover.svg";
        }    
    });

    sideButtons[i].addEventListener('mouseout', () => {
        let button = sideButtons[i];

        if (button.classList.contains('hovering-pressed')) {
            button.classList.remove("hovering-pressed");
            button.classList.add("pressed");
        }
        else if(button.classList.contains('hovering-unpressed')){
            button.classList.remove("hovering-unpressed");
            button.classList.add("unpressed");
        }

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
    });

    sideButtons[i].addEventListener('click', () => {
        let clickedButton = sideButtons[i];
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

        // if window is open, close it when button is clicked
        if (selectedWindow.style.display !== 'none') {
            selectedWindow.style.display = 'none';          
            clickedButton.classList.remove("unpressed");
            clickedButton.classList.remove("pressed");
            clickedButton.classList.remove("hovering-pressed");
            clickedButton.classList.add("hovering-unpressed");
        }
        // if window is closed, open it when button is clicked
        else {
            let allWindows = document.getElementsByClassName("side-window");
            for (let i = 0; i < allWindows.length; i++) {        
                (<HTMLElement>allWindows[i]).style.display = 'none';
            }
            for (let i = 0; i < sideButtons.length; i++) {     
                sideButtons[i].classList.remove("hovering-unpressed");
                sideButtons[i].classList.remove("hovering-pressed");   
                sideButtons[i].classList.remove("pressed");
                sideButtons[i].classList.add("unpressed");
            }
            selectedWindow.style.display = 'block';
            clickedButton.classList.remove("pressed");
            clickedButton.classList.remove("unpressed");
            clickedButton.classList.remove("hovering-unpressed");
            clickedButton.classList.add("hovering-pressed");
        }
    });
}

