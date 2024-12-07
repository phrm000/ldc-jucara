const C = {
    setSize(w, h, p = 1, css) {
        this.width = w;
        this.height = h;
        this.pD = p; // Pixel density
        this.css = css;
    },
    createCanvas() {
        this.main = createCanvas(this.width, this.height, WEBGL);
        pixelDensity(this.pD);
        this.main.id(this.css);
        this.resize(); // Apply initial resizing
    },
    resize() {
        const canvas = document.getElementById(this.css);
        if (!canvas) {
            console.error(`Canvas with ID "${this.css}" not found`);
            return;
        }
        const isLandscape = window.innerWidth / window.innerHeight > this.width / this.height;
        canvas.style.height = isLandscape ? "100%" : "";
        canvas.style.width = isLandscape ? "" : "100%";
    }
};

// Set canvas size and ID
C.setSize(600, 600, 1, 'mainCanvas');

// Handle window resizing with minimal overhead
function windowResized() {
    C.resize();
    redraw(); // Redraw after resizing
}
