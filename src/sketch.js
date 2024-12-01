//////////////////////////////////////////////////
// P5 FUNCTIONS

const { circle } = require("p5.brush");


function preload() {
  // If you are going to use custom image brush tips, include this in preload!
  brush.preload();
}

let palette = ["#002185", "#fcd300", "#ff2702", "#6b9404"];
let i = 0;



function setup() {
    


    
  C.createCanvas();
  background("#D6DDD0");
  angleMode(RADIANS);



  translate(-width / 2, -height / 2);

  let radius = 100;
  let startX = width / 2;
  let startY = radius - height / 3; //Ver depois

  drawCircle (radius,startX,startY);

  
  

 
     

}




function drawCircle (circleR,circleStartX,circleStartY){
  let circleCoordinates = randomCircleCoordinates(circleR, circleStartX,circleStartY)
  console.log(circleCoordinates);
  setHatchFill(circleR);
  drawCircleContainer(circleCoordinates);

  for(let i = 0; i < 3; i++){
    console.log(i);
  setHatchTexture(circleR);
  drawCircleContainer(circleCoordinates);
  }
}

function randomCircleCoordinates(circleR, circleStartX,circleStartY){

  let randomCircleFactor = random(0.95,1.05);
  let point1X = randomCircleFactor * circleStartX;
  randomCircleFactor = random(0.95,1.05);
  let point1Y = randomCircleFactor * circleStartY;
  randomCircleFactor = random(0.95,1.05);
  let point2X = randomCircleFactor * circleStartX + circleR;
  randomCircleFactor = random(0.95,1.05);
  let point2Y = randomCircleFactor * circleStartY + circleR;
  randomCircleFactor = random(0.95,1.05);
  let point3X = randomCircleFactor * circleStartX;
  randomCircleFactor = random(0.95,1.05);
  let point3Y = randomCircleFactor * circleStartY + circleR * 2;
  randomCircleFactor = random(0.95,1.05);
  let point4X = randomCircleFactor * circleStartX - circleR;
  randomCircleFactor = random(0.95,1.05);
  let point4Y = randomCircleFactor * circleStartY + circleR;

  return[point1X,point1Y, point2X, point2Y, point3X, point3Y, point4X, point4Y];

}

function drawCircleContainer(circleCoordinates){
  brush.noStroke();
  brush.beginShape(1);
  brush.vertex(circleCoordinates[0], circleCoordinates[1]);
  brush.vertex(circleCoordinates[2], circleCoordinates[3]);
  brush.vertex(circleCoordinates[4], circleCoordinates[5]);
  brush.vertex(circleCoordinates[6], circleCoordinates[7]);
  brush.endShape(CLOSE);
}

function setHatchFill(shapeSize){

  let randomColor = random(1, 100);
  let colorR = map(randomColor, 1, 100, 168, 209);
  let colorG = map(randomColor, 1, 100, 27, 69);
  let colorB = map(randomColor, 1, 100, 26, 26);


  brush.setHatch("charcoal", [colorR, colorG, colorB], 0.8  * shapeSize/100);
  brush.hatch(1, random(0, 0.3 * Math.PI), {
      rand: 0,
      continuous: false,
      gradient: 0,
    });


}

function setHatchTexture(shapeSize){

  let randomColor = random(1, 100);
  let colorR = map(randomColor, 1, 100, 168, 209);
  let colorG = map(randomColor, 1, 100, 27, 69);
  let colorB = map(randomColor, 1, 100, 26, 26);

      brush.setHatch("hatch_brush", [colorR, colorG, colorB], random(2,10) * shapeSize/100);
      brush.hatch(2, random(0, 0.3 * Math.PI), {
          rand: 0,
          continuous: false,
          gradient: 0.2,
        });


}




function draw() {

  




  
}

