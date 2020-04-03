export function closeOpenWindows(){
    let openWindows = document.getElementsByClassName('side-window');
    for (let i = 0; i < openWindows.length; i++) {        
        (<HTMLElement>openWindows[i]).style.display = 'none';        
    }
    let pressedButtons = document.getElementsByClassName('side-buttons')
    for (let i = 0; i < pressedButtons.length; i++) {        
        (<HTMLElement>pressedButtons[i]).style.boxShadow = '-3px -3px 8px #FFFFFF, 3px 3px 8px rgba(201, 201, 201, 0.5)'
    }
}