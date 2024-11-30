
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
    brush.setHatch("HB", "#380533", 5);
    brush.hatch(1, 0, {rand: 0, continuous: false, gradient: 0.1});
    brush.bleed(0)
    brush.fill("#380533", 100);

    brush.circle(width/2,height/2, 50, false);
    brush.fill("#380533", 100);
    brush.circle(width/2,height/2, 50, false);

    brush.fillTexture(1,0)
    

    
    
    
}

function draw() {



    
}

function mouseDragged() {
    loop()
    frameRate(10)
    x_values[0] = mouseX
    y_values[0] = mouseY
}