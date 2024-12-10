document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");

    const verticalFrameInput = document.getElementById("verticalFrame");
    const squareFrameInput = document.getElementById("squareFrame");

    verticalFrameInput.addEventListener("click", () => {
        canvasHeight = window.innerHeight * 0.9;
        canvasWidth = canvasHeight * 0.7;
        updateCanvasAndUI(verticalFrameInput, [squareFrameInput]);
        restart();
    });

    squareFrameInput.addEventListener("click", () => {
        canvasHeight = window.innerHeight * 0.63;
        canvasWidth = canvasHeight;
        updateCanvasAndUI(squareFrameInput, [verticalFrameInput]);
        restart();
    });

    verticalFrameInput.click();
});

function updateCanvasAndUI(activeElement, otherElements) {
    activeElement.classList.add("active");
    otherElements.forEach((element) => element.classList.remove("active"));
    otherElements.forEach((element) => element.classList.add("deactivated"));
    C.resize(); 
    background("#EAEADC");
}

const inputLabel = document.querySelectorAll(".inputLabel-container");

for (let labelCounter = 0; labelCounter < inputLabel.length; labelCounter++) {
    inputLabel[labelCounter].addEventListener("mouseover", pauseDrawing);
    inputLabel[labelCounter].addEventListener("mouseleave", unpauseDrawing);
}

function pauseDrawing() {
    frameRate(0);
    console.log("Pause drawing");
    isPaused = true;
}

function unpauseDrawing() {
    frameRate(60);
    console.log("Unpause drawing");
    isPaused = false;
}