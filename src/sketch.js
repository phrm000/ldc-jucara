
//////////////////////////////////////////////////
// P5 FUNCTIONS

function preload() {
    // If you are going to use custom image brush tips, include this in preload!
    brush.preload();
}

let palette = ["#002185", "#fcd300", "#ff2702", "#6b9404"]

let x_values = []
let y_values = []

function setup () {


    C.createCanvas()
    background("#e2e7dc")
    angleMode(RADIANS)
    translate(-width/2,-height/2)
        
    
    brush.noStroke();
    brush.setHatch("HB", "#1E031D", 4);
    brush.hatch(1, 90, {rand: 0, continuous: false, gradient: 0.01});
    brush.bleed(0)

    brush.circle(width/2,height/2, 50, false);
    fill("#380533");
    circle(width/2,height/2, 100, false);



    brush.fillTexture(1,1)
    

    
    
    
}

function draw() {



    
}

function mouseDragged() {
    loop()
    frameRate(10)
    x_values[0] = mouseX
    y_values[0] = mouseY
}