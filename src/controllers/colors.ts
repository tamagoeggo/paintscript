import { colorWheel } from "./colorwheel.js";

export let usedColors: string[] = [];
document.getElementById('color-button').style.boxShadow = 'inset 3px 3px 8px #DADADA, inset -3px -3px 8px rgba(255, 255, 255, 0.5)';

export function generateUsedColors(usedColors: string[]) {
    // default text can be removed 
    if (usedColors.length == 1){
        let noColorsInHistory = document.getElementById('noColorsInHistory');
        if(noColorsInHistory != null){
            noColorsInHistory.parentNode.removeChild(noColorsInHistory);
        }
    }

    while (usedColors.length > 32) {
        usedColors.splice(-1,1);
    }

    for (let color of usedColors) {
        let usedColor = document.createElement('button');
        usedColor.className = "colorblock";
        usedColor.style.cssText = "width: 23px; height: 23px; background-color: " + color;
        document.getElementById('historycontainer').append(usedColor);
    }
}

export function removeUsedColors() {
    let colorBlock = document.getElementsByClassName('colorblock');
    while(colorBlock[0]) {
        colorBlock[0].parentNode.removeChild(colorBlock[0]);
    }​
}

export function getColorFromHistory(){
    for (let i = 0; i < document.getElementsByClassName('colorblock').length; i++) {        
        document.getElementsByClassName('colorblock')[i].addEventListener("click", (e) => {
            colorWheel.hex = usedColors[i];        
        });
    }
}

