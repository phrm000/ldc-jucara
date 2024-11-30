//////////////////////////////////////////////////
// P5 FUNCTIONS

function preload() {
  // If you are going to use custom image brush tips, include this in preload!
  brush.preload();
}

let palette = ["#002185", "#fcd300", "#ff2702", "#6b9404"];
let i = 0;



function setup() {
  C.createCanvas();
  background("#0a0a0a");
  angleMode(RADIANS);

  translate(-width / 2, -height / 2);

  //Draw first




  let circleR = 100;
    let circleStartX = width / 2;
    let circleStartY = circleR - height / 3; //Ver depois
    let randomCircleFactor = random(0.5,1.4);
  
    
    let point1X = randomCircleFactor * circleStartX;
    let point1Y = randomCircleFactor * circleStartY;
    let point2X = randomCircleFactor * circleStartX + circleR;
    let point2Y = randomCircleFactor * circleStartY + circleR;
    let point3X = randomCircleFactor * circleStartX;
    let point3Y = randomCircleFactor * circleStartY + circleR * 2;
    let point4X = randomCircleFactor * circleStartX - circleR;
    let point4Y = randomCircleFactor * circleStartY + circleR;
  
  
  
    
    while (i < 2) {
      let randomColor = random(1, 100);
      let colorR = map(randomColor, 1, 100, 168, 209);
      let colorG = map(randomColor, 1, 100, 27, 69);
      let colorB = map(randomColor, 1, 100, 26, 26);

      console.log([colorR, colorG, colorB] )
  
      brush.setHatch("hatch_brush", [colorR, colorG, colorB], random(1,4) * circleR/100 * i/2);
      brush.hatch(1, random(0, 0.3 * Math.PI), {
          rand: 0,
          continuous: false,
          gradient: 0.2,
        });
  
    // //   brush.fill([colorR,colorG,colorB], 100);
    //   brush.fillTexture(1,0);
    //   brush.bleed(0);
      
      brush.noStroke();
      brush.beginShape(1);
      brush.vertex(point1X, point1Y);
      brush.vertex(point2X, point2Y);
      brush.vertex(point3X, point3Y);
      brush.vertex(point4X, point4Y);
      brush.endShape(CLOSE);
     
      i++;
    }

  




   

}

function draw() {






}

