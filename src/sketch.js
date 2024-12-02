//////////////////////////////////////////////////
// P5 FUNCTIONS

let fruitdarkestFillColor;
let fruitLightestFillColor;

function preload() {
  // If you are going to use custom image brush tips, include this in preload!
  brush.preload();
}

function setup() {
  C.createCanvas();
  background("#D6DDD0");
  angleMode(RADIANS);
}

function drawFruit(fruitR, fruitStartX, fruitStartY) {
  //Colorize
  let stage = random(0, 100);
  if (stage > 33) {
    fruitdarkestFillColor = "#19011B";
    fruitLightestFillColor = "#310314";
  } else if (stage > 16) {
    fruitDarkestFillColor = "#39230F";
    fruitLightestFillColor = "#432A16";
  } else {
    fruitdarkestFillColor = "#19310A";
    fruitLightestFillColor = "#234B13";
  }
  fruitdarkestFillColorRGB = hexToRgb(fruitdarkestFillColor);
  fruitLightestFillColorRGB = hexToRgb(fruitLightestFillColor);

  //Randomize coordinates
  let fruitCoordinates = randomCircleCoordinates(
    fruitR,
    fruitStartX,
    fruitStartY
  );

  //Base color
  setHatchFill(fruitR, fruitLightestFillColorRGB, fruitdarkestFillColorRGB);
  //Base container
  drawCircleContainer(fruitCoordinates);

  for (let i = 0; i < 4; i++) {
    //Adding texture
    setHatchTexture(
      fruitR,
      fruitLightestFillColorRGB,
      fruitdarkestFillColorRGB
    );
    //Base container
    drawCircleContainer(fruitCoordinates);
  }
  //Fruit stem
  drawFruitStem(
    fruitCoordinates,
    fruitR,
    fruitLightestFillColorRGB,
    fruitdarkestFillColorRGB
  );
}

function drawFruitStem(fruitCoordinates, shapeSize, lightRGB, darkRGB) {
  let avgX =
    (fruitCoordinates[0] +
      fruitCoordinates[2] +
      fruitCoordinates[4] +
      fruitCoordinates[6]) /
    4;
  let avgY =
    (fruitCoordinates[1] +
      fruitCoordinates[3] +
      fruitCoordinates[5] +
      fruitCoordinates[7]) /
    4;

  let randomColor = random(50, 100);
  let colorR = map(randomColor, 1, 100, lightRGB.r, darkRGB.r);
  let colorG = map(randomColor, 1, 100, lightRGB.g, darkRGB.g);
  let colorB = map(randomColor, 1, 100, lightRGB.b, darkRGB.b);

  brush.set("pen", [colorR, colorG, colorB], shapeSize / 5);
  let points = [
    [30, 70],
    [85, 20],
    [130, 100],
    [180, 50],
  ];
  let angleStep = TWO_PI / 10;
  let radius = shapeSize / 10;
  points = [];
  for (let angle = 0; angle < TWO_PI; angle += angleStep) {
    let x = avgX + cos(angle) * radius + random(-10, 10);
    let y = avgY + sin(angle) * radius + random(-10, 10);
    points.push([x, y]);
  }
  // Create a spline curve with a specified curvature
  brush.spline(points, 0.5);
}

function randomCircleCoordinates(fruitR, fruitStartX, fruitStartY) {
  let randomfruitFactor = random(0.95, 1.05);
  let point1X = randomfruitFactor * fruitStartX;
  randomfruitFactor = random(0.95, 1.05);
  let point1Y = randomfruitFactor * fruitStartY;
  randomfruitFactor = random(0.95, 1.05);
  let point2X = randomfruitFactor * fruitStartX + randomfruitFactor * fruitR;
  randomfruitFactor = random(0.95, 1.05);
  let point2Y = randomfruitFactor * fruitStartY + randomfruitFactor * fruitR;
  randomfruitFactor = random(0.95, 1.05);
  let point3X = randomfruitFactor * fruitStartX;
  randomfruitFactor = random(0.95, 1.05);
  let point3Y =
    randomfruitFactor * fruitStartY + randomfruitFactor * fruitR * 2;
  randomfruitFactor = random(0.95, 1.05);
  let point4X = randomfruitFactor * fruitStartX - randomfruitFactor * fruitR;
  randomfruitFactor = random(0.95, 1.05);
  let point4Y = randomfruitFactor * fruitStartY + randomfruitFactor * fruitR;

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
  let randomColor = random(1, 100);

  let colorR = map(randomColor, 1, 100, lightRGB.r, darkRGB.r);
  let colorG = map(randomColor, 1, 100, lightRGB.g, darkRGB.g);
  let colorB = map(randomColor, 1, 100, lightRGB.b, darkRGB.b);

  brush.setHatch("charcoal", [colorR, colorG, colorB], (1.5 * shapeSize) / 100);
  brush.hatch(1, random(0, 0.3 * Math.PI), {
    rand: 0,
    continuous: false,
    gradient: 0,
  });
}

function setHatchTexture(shapeSize, lightRGB, darkRGB) {
  let randomColor = random(1, 100);
  let colorR = map(randomColor, 1, 100, lightRGB.r, darkRGB.r);
  let colorG = map(randomColor, 1, 100, lightRGB.g, darkRGB.g);
  let colorB = map(randomColor, 1, 100, lightRGB.b, darkRGB.b);

  brush.setHatch(
    "hatch_brush",
    [colorR, colorG, colorB],
    (random(2, 10) * shapeSize) / 100
  );
  brush.hatch(2, random(0, 0.3 * Math.PI), {
    rand: 0,
    continuous: false,
    gradient: 0.2,
  });
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

//###DRAW
function draw() {
  translate(-width / 2, -height / 2);
  let radius = 50;

  let startX = -width / 2;
  let startY = radius - height / 3;

  let numFruits = width / radius;
  let curveHeight = height;
  let curveWidth = width / 3;

  if (frameCount <= numFruits) {
    let t = (frameCount - 1) / (numFruits - 1);
    let x = startX - curveWidth * cos(t * PI);
    let y = startY + curveHeight * t; // Linear interpolation for y
    drawFruit(radius, x, y);
  } else if (frameCount <= numFruits * 20) {
    let curveIndex = Math.floor((frameCount - 1) / numFruits);
    let t = ((frameCount - 1) % numFruits) / (numFruits - 1);
    let x = startX - curveWidth * cos(t * PI) + curveIndex * (width * 0.1);
    let y = startY + curveHeight * t; // Linear interpolation for y
    drawFruit(radius, x, y);
  }
}
