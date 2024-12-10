let fruitdarkestFillColor;
let fruitLightestFillColor;

var fruitRadiusSlider = document.getElementById("fruitRadiusSlider");
var blankSpaceChanceSlider = document.getElementById("blankSpaceChanceSlider");
var angleOffsetSlider = document.getElementById("angleOffsetSlider");
var curveSpacingSlider = document.getElementById("curveSpacingSlider");
let isPaused = false;
const colorCache = {};


var productTitleField = document.getElementById("productTitleField");
var productDescriptionField = document.getElementById(
  "productDescriptionField"
);

fruitRadiusSlider.addEventListener("input", restart);
blankSpaceChanceSlider.addEventListener("input", restart);
angleOffsetSlider.addEventListener("input", restart);
curveSpacingSlider.addEventListener("input", restart);


function preload() {
  brush.preload();
  titleFont = loadFont("fonts/styro-variable.ttf");
  descFont = loadFont("fonts/inter.ttf");
}

function setup() {
  C.createCanvas();
  background("#EAEADC");
  angleMode(RADIANS);
  textFont(titleFont);
}
//Redraws entire canvas on activation
function restart(){
  background("#EAEADC");
  frameCount = 0;
  fruitsPerCurve = 0;
  pointsForSpline = [];
  setup()
}

//Redraws entire canvas on windows resize
function windowResized() {
  C.resize();
  redraw();
  background("#EAEADC");
}



//Draws circle Coordinates
function randomCircleCoordinates(circleR, circleStartX, circleStartY) {
  const randomCircleFactor = () => random(0.98, 1.02);
  const point1X = randomCircleFactor() * circleStartX;
  const point1Y = randomCircleFactor() * circleStartY;
  const point2X =
    randomCircleFactor() * circleStartX + randomCircleFactor() * circleR;
  const point2Y =
    randomCircleFactor() * circleStartY + randomCircleFactor() * circleR;
  const point3X = randomCircleFactor() * circleStartX;
  const point3Y =
    randomCircleFactor() * circleStartY + randomCircleFactor() * circleR * 2;
  const point4X =
    randomCircleFactor() * circleStartX - randomCircleFactor() * circleR;
  const point4Y =
    randomCircleFactor() * circleStartY + randomCircleFactor() * circleR;

  return [
    point1X,
    point1Y,
    point2X,
    point2Y,
    point3X,
    point3Y,
    point4X,
    point4Y,
  ];
}

//Creates circles container - the circle itself
function drawCircleContainer(fruitCoordinates) {
  brush.noStroke();
  brush.beginShape(1);
  brush.vertex(fruitCoordinates[0], fruitCoordinates[1]);
  brush.vertex(fruitCoordinates[2], fruitCoordinates[3]);
  brush.vertex(fruitCoordinates[4], fruitCoordinates[5]);
  brush.vertex(fruitCoordinates[6], fruitCoordinates[7]);
  brush.endShape(CLOSE);
}

//Fill the circle container with the fill
function setHatchFill(shapeSize, lightRGB, darkRGB) {
  const randomColor = random(1, 100);

  const colorR = map(randomColor, 1, 100, lightRGB.r, darkRGB.r);
  const colorG = map(randomColor, 1, 100, lightRGB.g, darkRGB.g);
  const colorB = map(randomColor, 1, 100, lightRGB.b, darkRGB.b);

  brush.setHatch("charcoal", [colorR, colorG, colorB], shapeSize/5);
  brush.hatch(shapeSize/50, 0, {
    rand: 0,
    continuous: false,
    gradient: 0,
  });
}

//Puts colored layer for texture above the fill
function setHatchTexture(shapeSize, lightRGB, darkRGB) {
  const randomColor = random(1, 50);
  const colorR = map(randomColor, 1, 100, lightRGB.r, darkRGB.r);
  const colorG = map(randomColor, 1, 100, lightRGB.g, darkRGB.g);
  const colorB = map(randomColor, 1, 100, lightRGB.b, darkRGB.b);

  brush.setHatch(
    "hatch_brush",
    [colorR, colorG, colorB],
    (random(2, 10) * shapeSize) / 100
  );
  brush.hatch(shapeSize / 100, 0, {
    rand: 0,
    continuous: true,
    gradient: 0.4,
  });
}

//Checks if the color already has been randomized and parse it to a RGB
function hexToRgbCached(hex) {
  if (colorCache[hex]) return colorCache[hex];
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const rgb = result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
  colorCache[hex] = rgb;
  return rgb;
}