let canvasHeight = window.innerHeight * 0.9;
let canvasWidth = canvasHeight * 0.7;

const C = {
    setSize(p = 1, css) {
        this.pD = p;
        this.css = css;
        this.updateSize();
    },
    updateSize() {
        this.height = canvasHeight;
        this.width = canvasWidth;
    },
    createCanvas() {
        this.updateSize();
        this.main = createCanvas(this.width, this.height, WEBGL);
        pixelDensity(this.pD);
        this.main.id(this.css);
        const container = document.getElementById(this.css);
        if (container) {
            container.appendChild(this.main.elt);
        }
        this.resize();
    },
    resize() {
        this.updateSize();
        if (typeof resizeCanvas === "function") {
            resizeCanvas(this.width, this.height);
        } else {
            console.error("resizeCanvas is not available yet.");
        }
    }
};
