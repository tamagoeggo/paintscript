export function closeWindows(){
    let openWindows = document.getElementsByClassName('side-window');
    for (let i = 0; i < openWindows.length; i++) {        
        (<HTMLElement>openWindows[i]).style.display = 'none';        
    }
    let pressedButtons = document.getElementsByClassName('side-buttons')
    for (let i = 0; i < pressedButtons.length; i++) {        
        (<HTMLElement>pressedButtons[i]).style.boxShadow = '-3px -3px 8px #FFFFFF, 3px 3px 8px rgba(201, 201, 201, 0.5)'
    }
}

// toggle windows 
let sideButtons = document.getElementsByClassName('side-buttons');
let windowId = '';
for (let i = 0; i < sideButtons.length; i++){
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

        let selectedWindow = document.getElementById(windowId);
        if (selectedWindow.style.display !== 'none') {
            selectedWindow.style.display = 'none';
            document.getElementById(clickedButton.id).style.boxShadow = '-3px -3px 8px #FFFFFF, 3px 3px 8px rgba(201, 201, 201, 0.5)';
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
            selectedWindow.style.display = 'block';
            document.getElementById(clickedButton.id).style.boxShadow = 'inset 3px 3px 8px #DADADA, inset -3px -3px 8px rgba(255, 255, 255, 0.5)';
        }
    });
}