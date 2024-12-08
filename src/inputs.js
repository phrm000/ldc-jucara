document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");


    const verticalFrameInput = document.getElementById("verticalFrame");
    const horizontalFrameInput = document.getElementById("horizontalFrame");
    const squareFrameInput = document.getElementById("squareFrame");


    verticalFrameInput.addEventListener("click", () => {
        canvasHeight = window.innerHeight * 0.8;
        canvasWidth = canvasHeight * 0.7;
        updateCanvasAndUI(verticalFrameInput, [horizontalFrameInput, squareFrameInput]);
    });

    horizontalFrameInput.addEventListener("click", () => {
        canvasHeight = window.innerHeight * 0.7;
        canvasWidth = canvasHeight * 1.3;
        updateCanvasAndUI(horizontalFrameInput, [verticalFrameInput, squareFrameInput]);
    });

    squareFrameInput.addEventListener("click", () => {
        canvasHeight = window.innerHeight * 0.8;
        canvasWidth = canvasHeight;
        updateCanvasAndUI(squareFrameInput, [verticalFrameInput, horizontalFrameInput]);
    });


    verticalFrameInput.click();
});


function updateCanvasAndUI(activeElement, otherElements) {
    activeElement.classList.add("active");
    otherElements.forEach((element) => element.classList.remove("active"));
    otherElements.forEach((element) => element.classList.add("deactivated"));
    C.resize(); 
    redraw(); 
    background("#EAEADC");



}

