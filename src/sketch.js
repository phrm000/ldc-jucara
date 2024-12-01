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
  background("#D6DDD0");
  angleMode(RADIANS);

  translate(-width / 2, -height / 2);

  //Draw first


    let circleR = 100;
    let circleStartX = width / 2;
    let circleStartY = circleR - height / 3; //Ver depois
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
  
  

    let randomColor = random(1, 100);
    let colorR = map(randomColor, 1, 100, 168, 209);
    let colorG = map(randomColor, 1, 100, 27, 69);
    let colorB = map(randomColor, 1, 100, 26, 26);

  
    brush.setHatch("charcoal", [colorR, colorG, colorB], 0.8  * circleR/100);
    brush.hatch(1, random(0, 0.3 * Math.PI), {
        rand: 0,
        continuous: false,
        gradient: 0,
      });

    brush.fillTexture(1,0);
    brush.bleed(0);

    brush.noStroke();
    brush.beginShape(1);
    brush.vertex(point1X, point1Y);
    brush.vertex(point2X, point2Y);
    brush.vertex(point3X, point3Y);
    brush.vertex(point4X, point4Y);
    brush.endShape(CLOSE);



    
    while (i < 2) {
       randomColor = random(1, 100);
       colorR = map(randomColor, 1, 100, 168, 209);
       colorG = map(randomColor, 1, 100, 27, 69);
       colorB = map(randomColor, 1, 100, 26, 26);

  
      brush.setHatch("hatch_brush", [colorR, colorG, colorB], random(8,12) * circleR/100 * i);
      brush.hatch(2, random(0, 0.3 * Math.PI), {
          rand: 0,
          continuous: false,
          gradient: 0.2,
        });

      brush.fillTexture(1,0);
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

function draw() {






}

