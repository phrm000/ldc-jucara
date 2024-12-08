document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");

    const verticalFrameInput = document.getElementById("verticalFrame");
    const squareFrameInput = document.getElementById("squareFrame");

    verticalFrameInput.addEventListener("click", () => {
        canvasHeight = window.innerHeight * 0.9;
        canvasWidth = canvasHeight * 0.7;
        updateCanvasAndUI(verticalFrameInput, [squareFrameInput]);
    });

    squareFrameInput.addEventListener("click", () => {
        canvasHeight = window.innerHeight * 0.95;
        canvasWidth = canvasHeight;
        updateCanvasAndUI(squareFrameInput, [verticalFrameInput]);
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

