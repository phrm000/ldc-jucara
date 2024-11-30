//////////////////////////////////////////////////
// P5 FUNCTIONS

function preload() {
  // If you are going to use custom image brush tips, include this in preload!
  brush.preload();
}

let palette = ["#002185", "#fcd300", "#ff2702", "#6b9404"];
let i = 0;


let points = [];



function setup() {
  C.createCanvas();
  background("#E9D9BD");
  angleMode(RADIANS);

  translate(-width / 2, -height / 2);

  //Draw first



  




   

}

function draw() {

    brush.reDraw()

translate(-width / 2, -height / 2);


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



  
  while (i < 1) {
    let randomColor = random(1, 100);
    let colorR = map(randomColor, 1, 100, 168, 209);
    let colorG = map(randomColor, 1, 100, 27, 69);
    let colorB = map(randomColor, 1, 100, 26, 26);

    brush.setHatch("charcoal", [colorR, colorG, colorB], random(1,2) * circleR/100);
    brush.hatch(3, random(0, 270), {
        rand: 0,
        continuous: false,
        gradient: 0.01 * i,
      });

    brush.fill([colorR,colorG,colorB], 100);
    brush.fillTexture(0,0);
    brush.bleed(0);
    
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

