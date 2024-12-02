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


  
  // translate(-width / 2, -height / 2);
  // let radius = 80;

  // let startX = -width / 2;
  // let startY = height /5;
  
  // drawFruit(radius, -startX, startY);
  
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
  fruitDarkestFillColorRGB = hexToRgb(fruitdarkestFillColor);
  fruitLightestFillColorRGB = hexToRgb(fruitLightestFillColor);

  //Randomize coordinates
  let fruitCoordinates = randomCircleCoordinates(
    fruitR,
    fruitStartX,
    fruitStartY
  );

  //Base color
  setHatchFill(fruitR, fruitLightestFillColorRGB, fruitDarkestFillColorRGB);
  //Base container
  drawCircleContainer(fruitCoordinates);

  for (let i = 0; i < 4; i++) {
    //Adding texture
    setHatchTexture(
      fruitR,
      fruitLightestFillColorRGB,
      fruitDarkestFillColorRGB
    );
    //Base container
    drawCircleContainer(fruitCoordinates);
  }
  //Fruit stem
  drawFruitStem(
    fruitCoordinates,
    fruitR,
    fruitLightestFillColorRGB,
    fruitDarkestFillColorRGB
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

function randomCircleCoordinates(circleR, circleStartX, circleStartY) {
  let randomCircleFactor = random(0.95, 1.05);
  let point1X = randomCircleFactor * circleStartX;
  randomCircleFactor = random(0.95, 1.05);
  let point1Y = randomCircleFactor * circleStartY;
  randomCircleFactor = random(0.95, 1.05);
  let point2X = randomCircleFactor * circleStartX + randomCircleFactor * circleR;
  randomCircleFactor = random(0.95, 1.05);
  let point2Y = randomCircleFactor * circleStartY + randomCircleFactor * circleR;
  randomCircleFactor = random(0.95, 1.05);
  let point3X = randomCircleFactor * circleStartX;
  randomCircleFactor = random(0.95, 1.05);
  let point3Y =
    randomCircleFactor * circleStartY + randomCircleFactor * circleR * 2;
  randomCircleFactor = random(0.95, 1.05);
  let point4X = randomCircleFactor * circleStartX - randomCircleFactor * circleR;
  randomCircleFactor = random(0.95, 1.05);
  let point4Y = randomCircleFactor * circleStartY + randomCircleFactor * circleR;

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




function drawTucano(tucanoR, tucanoStartX, tucanoStartY) {
  //Colorize

  tucanodarkestFillColor = "#901010";
  tucanoLightestFillColor = "#C3810D";

  tucanoDarkestFillColorRGB = hexToRgb(tucanodarkestFillColor);
  tucanoLightestFillColorRGB = hexToRgb(tucanoLightestFillColor);

  //Randomize coordinates
  let tucanoCoordinates = randomCircleCoordinates(
    tucanoR,
    tucanoStartX,
    tucanoStartY
  );

  //Base color
  setHatchFill(tucanoR, tucanoLightestFillColorRGB, tucanoDarkestFillColorRGB);
  //Base container
  drawCircleContainer(tucanoCoordinates);

  for (let i = 0; i < 4; i++) {
    //Adding texture
    setHatchTexture(
      tucanoR,
      tucanoLightestFillColorRGB,
      tucanoDarkestFillColorRGB
    );
    //Base container
    drawCircleContainer(tucanoCoordinates);
  }


  drawTucanBeak(
    tucanoCoordinates,
    tucanoR,
    tucanoLightestFillColorRGB,
    tucanoDarkestFillColorRGB
  );


  //draw Beak
  //draw circle eye
  //draw circle eyeball
  //draw wings  

}


function drawTucanBeak(tucanoCoordinates, tucanoR, lightRGB, darkRGB) {
  let avgX =
    (tucanoCoordinates[0] +
      tucanoCoordinates[2] +
      tucanoCoordinates[4] +
      tucanoCoordinates[6]) /
    4;
  let avgY =
    (tucanoCoordinates[1] +
      tucanoCoordinates[3] +
      tucanoCoordinates[5] +
      tucanoCoordinates[7]) /
    4;

    

    brush.noStroke();       // Disable stroke for this shape
  
    let points = [
      [60, 295],      // Sharp
      [0, 238.19],    // Curve
      [135, 124.56],  // Curve
      [185, 289.32],  // Sharp
      [110, 272.96],  // Curve
      [35, 287.5]     // Sharp
    ];
  
    // Interpolation factor (number of points between main vertices)
    let interpolationFactor = 10;
  
    // Generate curve points
    let interpolatedPoints = generateInterpolatedPoints(points, interpolationFactor);
  
    // Begin custom shape
    brush.beginShape();
  
    // Use interpolated points for smooth curves
    for (let pt of interpolatedPoints) {
      brush.vertex(pt[0], pt[1]);
    }
  
    // Close and fill the shape
    brush.endShape(CLOSE);
  }
  

  function generateInterpolatedPoints(points, numSegments) {
    let newPoints = [];
    for (let i = 0; i < points.length; i++) {
      let p0 = points[i];
      let p1 = points[(i + 1) % points.length]; // Loop back at the end
  
      if (i === 0 || i === 3 || i === 5) {
        // Sharp point, just add the original
        newPoints.push(p0);
      } else {
        // Interpolate between p0 and p1 for smooth curves
        for (let t = 0; t <= 1; t += 1 / numSegments) {
          let x = lerp(p0[0], p1[0], t);
          let y = lerp(p0[1], p1[1], t);
          newPoints.push([x, y]);
        }
      }
    }
    return newPoints;
  }