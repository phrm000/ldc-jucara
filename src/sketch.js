//////////////////////////////////////////////////
// P5 FUNCTIONS

let fruitdarkestFillColor;
let fruitLightestFillColor;

var fruitRadiusSlider = document.getElementById("fruitRadiusSlider");
var blankSpaceChanceSlider = document.getElementById("blankSpaceChanceSlider");
var angleOffsetSlider = document.getElementById("angleOffsetSlider");
var curveSpacingSlider = document.getElementById("curveSpacingSlider");



var productTitleField = document.getElementById("productTitleField");
var productDescriptionField = document.getElementById("productDescriptionField");

function preload() {
  brush.preload();
  font = loadFont("fonts/krona.ttf");
}

function setup() {
  C.createCanvas();
  background("#EAEADC");
  angleMode(RADIANS);
  textFont(font);
}

function windowResized() {
  C.resize();
  redraw();
  background("#EAEADC");
}

function drawFruit(fruitR, fruitStartX, fruitStartY) {
  // Colorize
  const stage = random(0, 100);
  const colorSet =
    stage > 33
      ? { darkest: "#19011B", lightest: "#310314" }
      : stage > 16
      ? { darkest: "#39230F", lightest: "#432A16" }
      : { darkest: "#19310A", lightest: "#234B13" };

  const fruitDarkestFillColorRGB = hexToRgbCached(colorSet.darkest);
  const fruitLightestFillColorRGB = hexToRgbCached(colorSet.lightest);

  // Randomize coordinates
  const fruitCoordinates = randomCircleCoordinates(
    fruitR,
    fruitStartX,
    fruitStartY
  );

  // Draw base and texture
  for (let j = 0; j < 2; j++) {
    setHatchFill(fruitR, fruitLightestFillColorRGB, fruitDarkestFillColorRGB);
    drawCircleContainer(fruitCoordinates);
  }

  for (let i = 0; i < 1; i++) {
    setHatchTexture(
      fruitR,
      fruitLightestFillColorRGB,
      fruitDarkestFillColorRGB
    );
    drawCircleContainer(fruitCoordinates);
  }

  // Fruit stem
  drawFruitStem(
    fruitCoordinates,
    fruitR,
    fruitLightestFillColorRGB,
    fruitDarkestFillColorRGB
  );
}

function drawFruitStem(fruitCoordinates, shapeSize, lightRGB, darkRGB) {
  const avgX =
    (fruitCoordinates[0] +
      fruitCoordinates[2] +
      fruitCoordinates[4] +
      fruitCoordinates[6]) /
    4;
  const avgY =
    (fruitCoordinates[1] +
      fruitCoordinates[3] +
      fruitCoordinates[5] +
      fruitCoordinates[7]) /
    4;

  const randomColor = random(75, 100);
  const colorR = map(randomColor, 1, 100, lightRGB.r, darkRGB.r);
  const colorG = map(randomColor, 1, 100, lightRGB.g, darkRGB.g);
  const colorB = map(randomColor, 1, 100, lightRGB.b, darkRGB.b);

  brush.set("charcoal", [colorR, colorG, colorB], shapeSize / 2);
  const points = [];
  const angleStep = TWO_PI / 10;
  const radius = shapeSize / 10;

  for (let angle = 0; angle < TWO_PI; angle += angleStep) {
    const x = avgX + cos(angle) * radius + random(-10, 10);
    const y = avgY + sin(angle) * radius + random(-10, 10);
    points.push([x, y]);
  }
  brush.spline(points, 0.5);
}

function randomCircleCoordinates(circleR, circleStartX, circleStartY) {
  const randomCircleFactor = () => random(0.95, 1.05);
  const point1X = randomCircleFactor() * circleStartX;
  const point1Y = randomCircleFactor() * circleStartY;
  const point2X = randomCircleFactor() * circleStartX + randomCircleFactor() * circleR;
  const point2Y = randomCircleFactor() * circleStartY + randomCircleFactor() * circleR;
  const point3X = randomCircleFactor() * circleStartX;
  const point3Y = randomCircleFactor() * circleStartY + randomCircleFactor() * circleR * 2;
  const point4X = randomCircleFactor() * circleStartX - randomCircleFactor() * circleR;
  const point4Y = randomCircleFactor() * circleStartY + randomCircleFactor() * circleR;

  return [point1X, point1Y, point2X, point2Y, point3X, point3Y, point4X, point4Y];
}

function drawCircleContainer(fruitCoordinates) {
  brush.noStroke();
  brush.beginShape(1);
  brush.vertex(fruitCoordinates[0], fruitCoordinates[1]);
  brush.vertex(fruitCoordinates[2], fruitCoordinates[3]);
  brush.vertex(fruitCoordinates[4], fruitCoordinates[5]);
  brush.vertex(fruitCoordinates[6], fruitCoordinates[7]);
  brush.endShape(CLOSE);
}

function setHatchFill(shapeSize, lightRGB, darkRGB) {
  const randomColor = random(1, 100);

  const colorR = map(randomColor, 1, 100, lightRGB.r, darkRGB.r);
  const colorG = map(randomColor, 1, 100, lightRGB.g, darkRGB.g);
  const colorB = map(randomColor, 1, 100, lightRGB.b, darkRGB.b);

  brush.setHatch("charcoal", [colorR, colorG, colorB], (5 * shapeSize) / 100);
  brush.hatch(shapeSize / 5, 0, {
    rand: 0,
    continuous: false,
    gradient: 0,
  });
}

function setHatchTexture(shapeSize, lightRGB, darkRGB) {
  const randomColor = random(1, 100);
  const colorR = map(randomColor, 1, 100, lightRGB.r, darkRGB.r);
  const colorG = map(randomColor, 1, 100, lightRGB.g, darkRGB.g);
  const colorB = map(randomColor, 1, 100, lightRGB.b, darkRGB.b);

  brush.setHatch(
    "hatch_brush",
    [colorR, colorG, colorB],
    (random(2, 10) * shapeSize) / 100
  );
  brush.hatch(shapeSize/100, 0, {
    rand: 0,
    continuous: false,
    gradient: 0.2,
  });
}

const colorCache = {};
function hexToRgbCached(hex) {
  if (colorCache[hex]) return colorCache[hex];
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const rgb = result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null;
  colorCache[hex] = rgb;
  return rgb;
}



let pointsForSpline = [];
let pointsForFruit = [];


// ###DRAW



function draw() {
  translate(-width / 2, -height / 2);
  // console.log(width);
  const fruitRadius = fruitRadiusSlider.value;
  const startX = 0 - fruitRadius * 2;
  const startY = 0 - fruitRadius;

  const curveHeight = height;
  const curveWidth = width / 3;
  const angleOffset = 10 - angleOffsetSlider.value;

  const blankSpaceChance = 10 - blankSpaceChanceSlider.value;
  const curveSpacing = map(curveSpacingSlider.value, 0, 20, 3, 0.3);

  const fruitSpacing = fruitRadius * 1.2;
  const fruitsPerCurve = Math.floor(curveHeight / fruitSpacing);

  if (random(1, 10) > blankSpaceChance) {
    if (frameCount <= fruitsPerCurve) {
      
      const t = (frameCount - 1) / (fruitsPerCurve - 1);
      const x = startX + curveWidth * cos(t * PI + angleOffset);
      const y = startY + curveHeight * t;
      pointsForSpline.push([(x * random(0.95,1.05)),(y * random(0.95,1.05))]);
      console.log(pointsForSpline)
      drawFruit(fruitRadius, x, y);
    } else {
      if(fruitsPerCurve == pointsForSpline.length){
        drawBranch(pointsForSpline,fruitRadius);
        console.log(pointsForSpline)
        pointsForSpline = [];

        for(let j = 0; j < pointsForFruit.length; j++){
          drawFruit(fruitRadius, pointsForFruit[j][0],pointsForFruit[j][1]);
          console.log(pointsForFruit[j].x)
        }
        pointsForFruit = [];
      }
      const curveIndex = Math.floor((frameCount - 1) / fruitsPerCurve);
      const t = ((frameCount - 1) % fruitsPerCurve) / (fruitsPerCurve - 1);
      const x =
        startX + curveWidth * cos(t * PI + angleOffset) +
        curveIndex * (curveWidth * curveSpacing);
      const y = startY + curveHeight * t;
      pointsForFruit.push([x,y]);
      pointsForSpline.push([(x * random(0.95,1.05)),(y * random(0.95,1.05))]);

    }
  }


  drawTextContainer();
}



function drawBranch(points,fruitRadius){

  const randomColor = random(1, 100);
  const colorR = map(randomColor, 1, 100, 85, 38);
  const colorG = map(randomColor, 1, 100, 48, 22);
  const colorB = map(randomColor, 1, 100, 17, 8);


  brush.set("2H",[colorR, colorG,colorB],map(fruitRadius,30,100,10,55));
  brush.spline(points, 1);
}



function drawTextContainer(){
  noStroke();
  fill("#EAEADC");
  rect(width * 0.05, height * 0.7, width * 0.9, height * 0.25); 

  fill("#381233");
  textAlign(LEFT,CENTER);
  textSize(28);
  text("Titulo de exemplo", width * 0.1, height * 0.75)


  fill("#381233");
  textAlign(LEFT,CENTER);
  textSize(16);
  text("Sub de exemplo", width * 0.1, height * 0.80)


}

