export function toggleEraserWindow(){
    document.getElementById('eraser-button').addEventListener('click', () => {
        let eraserwindow = document.getElementById("eraserwindow");
        if (eraserwindow.style.display !== 'none') {
            eraserwindow.style.display = 'none';
        }
        else {
            eraserwindow.style.display = 'block';
        }
    });
} 