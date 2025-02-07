let fruitdarkestFillColor;
let fruitLightestFillColor;

let fruitRadiusSlider = document.getElementById("fruitRadiusSlider");
let blankSpaceChanceSlider = document.getElementById("blankSpaceChanceSlider");
let angleOffsetSlider = document.getElementById("angleOffsetSlider");
let curveSpacingSlider = document.getElementById("curveSpacingSlider");

let productTitleField = document.getElementById("productTitleField");
let productDescriptionField = document.getElementById("productDescriptionField");

fruitRadiusSlider.addEventListener("input", restart);
blankSpaceChanceSlider.addEventListener("input", restart);
angleOffsetSlider.addEventListener("input", restart);
curveSpacingSlider.addEventListener("input", restart);

let isPaused = false;
const colorCache = {};

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


  // translate(-width / 2, -height / 2);
  // drawPerson(100,+100,0);
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