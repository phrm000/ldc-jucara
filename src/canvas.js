
let canvasHeight = window.innerHeight * 0.9;
let canvasWidth = canvasHeight * 0.7;

const C = {
    setSize(p = 1, css) {
        this.pD = p; // Densidade de pixels
        this.css = css; // ID do canvas
        this.updateSize(); // Define tamanhos iniciais
    },
    updateSize() {
        this.height = canvasHeight; // 70% da altura da janela
        this.width = canvasWidth; // Largura proporcional à altura
    },
    createCanvas() {
        this.updateSize(); // Atualiza dimensões antes de criar o canvas
        this.main = createCanvas(this.width, this.height, WEBGL);
        pixelDensity(this.pD);
        this.main.id(this.css);
        this.resize(); // Aplica redimensionamento inicial
    },
    resize() {
        this.updateSize(); // Atualiza dimensões no redimensionamento
        resizeCanvas(this.width, this.height); // Atualiza o tamanho do canvas
        const canvas = document.getElementById(this.css);
        if (!canvas) {
            console.error(`Canvas with ID "${this.css}" not found`);
            return;
        }
        canvas.style.width = ""; // Deixa o estilo CSS proporcional ao canvas
        canvas.style.height = "";
    }
};

// Configurar canvas
C.setSize(1, 'mainCanvas'); // ID e densidade de pixels

// Configuração inicial
function setup() {
    C.createCanvas(); // Cria o canvas
    background("#D6DDD0");
    noLoop(); // Evita redesenho constante
}

// Listener para redimensionar janela
function windowResized() {
    C.resize(); // Redimensiona canvas
    redraw(); // Redesenha conteúdo do canvas
}