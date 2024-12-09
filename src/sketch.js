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
  titleFont = loadFont("fonts/styro-variable.ttf");
  descFont = loadFont("fonts/inter.ttf");
}

function setup() {
  C.createCanvas();
  background("#EAEADC");
  angleMode(RADIANS);
  textFont(titleFont);

  translate(-width / 2, -height / 2);

  const tucanoRadius = 100; // Adjust radius as needed
  const tucanoX = width / 2;
  const tucanoY = height / 2;

  drawGralha(tucanoRadius, tucanoX, tucanoY);

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

    setHatchFill(fruitR, fruitLightestFillColorRGB, fruitDarkestFillColorRGB);
    drawCircleContainer(fruitCoordinates);



    setHatchTexture(
      fruitR,
      fruitLightestFillColorRGB,
      fruitDarkestFillColorRGB
    );
    drawCircleContainer(fruitCoordinates);


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
  const randomCircleFactor = () => random(0.98, 1.02);
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

  brush.setHatch("charcoal", [colorR, colorG, colorB], 15);
  brush.hatch(0.5, 0, {
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
  brush.hatch(shapeSize/200, 0, {
    rand: 0,
    continuous: true,
    gradient: 0.5,
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






function drawBranch(points,fruitRadius){

  const randomColor = random(1, 100);
  const colorR = map(randomColor, 1, 100, 85, 38);
  const colorG = map(randomColor, 1, 100, 48, 22);
  const colorB = map(randomColor, 1, 100, 17, 8);


  brush.set("2H",[colorR, colorG,colorB],map(fruitRadius,30,100,10,55));
  brush.spline(points, 1);
}





function drawGralha(tucanoR, tucanoStartX, tucanoStartY) {
  // Colorize
  const tucanoDarkestFillColor = "#0B2969";
  const tucanoLightestFillColor = "#022B84";

  const tucanoDarkestFillColorRGB = hexToRgbCached(tucanoDarkestFillColor);
  const tucanoLightestFillColorRGB = hexToRgbCached(tucanoLightestFillColor);

  const tucanoBeakDarkestFillColor = "#00010F";
  const tucanoBeakLightestFillColor = "#06092F";

  const tucanoBeakLightestFillColorRGB = hexToRgbCached(tucanoBeakLightestFillColor);
  const tucanoBeakDarkestFillColorRGB = hexToRgbCached(tucanoBeakDarkestFillColor);

  // Randomize coordinates
  const tucanoCoordinates = randomCircleCoordinates(
    tucanoR,
    tucanoStartX,
    tucanoStartY
  );

  const avgX =
    (tucanoCoordinates[0] +
      tucanoCoordinates[2] +
      tucanoCoordinates[4] +
      tucanoCoordinates[6]) /
    4;
  const avgY =
    (tucanoCoordinates[1] +
      tucanoCoordinates[3] +
      tucanoCoordinates[5] +
      tucanoCoordinates[7]) /
    4;
    


  setHatchFill(tucanoR, tucanoLightestFillColorRGB, tucanoDarkestFillColorRGB);

  drawCircleContainer(tucanoCoordinates);



    setHatchTexture(
      tucanoR,
      tucanoLightestFillColorRGB,
      tucanoDarkestFillColorRGB
    );
    drawCircleContainer(tucanoCoordinates);


    

    let tucanoEyeDarkestFillColor;
    let tucanoEyeLightestFillColor;



    for(let counterEyeFactor = 2; 3 >= counterEyeFactor; counterEyeFactor ++){
      console.log(counterEyeFactor)


      switch(counterEyeFactor){
        case 2:
          tucanoEyeDarkestFillColor = "#148DA6";
          tucanoEyeLightestFillColor = "#0B9BBA";
          break;
        case 3:
          tucanoEyeDarkestFillColor = "#000000";
          tucanoEyeLightestFillColor = "#000000";
          break;

      }
      console.log(tucanoEyeLightestFillColor)
      let tucanoEyeLightestFillColorRGB = hexToRgbCached(tucanoEyeLightestFillColor);
      let tucanoEyeDarkestFillColorRGB = hexToRgbCached(tucanoEyeDarkestFillColor);

      let tucanoEyesR = 3+ tucanoR/( 5 * counterEyeFactor);
      let tucanoStartX = avgX - tucanoR/10 ;
      let tucanoStartY = avgY - tucanoR/2.5;
      setHatchTexture(tucanoEyesR, tucanoEyeLightestFillColorRGB, tucanoEyeDarkestFillColorRGB);

      brush.circle(tucanoStartX, tucanoStartY, tucanoEyesR, false)

      
      
      
    }




  

  setHatchFill(tucanoR, tucanoBeakLightestFillColorRGB, tucanoBeakDarkestFillColorRGB);
  drawTucanBeak(
    tucanoCoordinates,
    tucanoR,
    tucanoBeakLightestFillColorRGB,
    tucanoBeakDarkestFillColorRGB
  );

  setHatchTexture(
    tucanoR,
    tucanoBeakLightestFillColorRGB,
    tucanoBeakDarkestFillColorRGB
  );


  drawTucanBeak(
    tucanoCoordinates,
    tucanoR,
    tucanoBeakLightestFillColorRGB,
    tucanoBeakDarkestFillColorRGB
  );



 for(let counterFactor = 0; 3 > counterFactor; counterFactor++){
  drawTucanoWings(
    tucanoCoordinates,
    tucanoR,
    counterFactor
  );

  setHatchTexture(
    tucanoR,
    tucanoBeakLightestFillColorRGB,
    tucanoBeakDarkestFillColorRGB
  );

  drawTucanoWings(
    tucanoCoordinates,
    tucanoR,
    counterFactor
  );
}

  
}

function drawTucano(tucanoR, tucanoStartX, tucanoStartY) {
  // Colorize
  const tucanoDarkestFillColor = "#C3810D";
  const tucanoLightestFillColor = "#DB7E1A";

  const tucanoDarkestFillColorRGB = hexToRgbCached(tucanoDarkestFillColor);
  const tucanoLightestFillColorRGB = hexToRgbCached(tucanoLightestFillColor);

  const tucanoBeakDarkestFillColor = "#00010F";
  const tucanoBeakLightestFillColor = "#06092F";

  const tucanoBeakLightestFillColorRGB = hexToRgbCached(tucanoBeakLightestFillColor);
  const tucanoBeakDarkestFillColorRGB = hexToRgbCached(tucanoBeakDarkestFillColor);

  // Randomize coordinates
  const tucanoCoordinates = randomCircleCoordinates(
    tucanoR,
    tucanoStartX,
    tucanoStartY
  );

  const avgX =
    (tucanoCoordinates[0] +
      tucanoCoordinates[2] +
      tucanoCoordinates[4] +
      tucanoCoordinates[6]) /
    4;
  const avgY =
    (tucanoCoordinates[1] +
      tucanoCoordinates[3] +
      tucanoCoordinates[5] +
      tucanoCoordinates[7]) /
    4;
    


  setHatchFill(tucanoR, tucanoLightestFillColorRGB, tucanoDarkestFillColorRGB);

  drawCircleContainer(tucanoCoordinates);



    setHatchTexture(
      tucanoR,
      tucanoLightestFillColorRGB,
      tucanoDarkestFillColorRGB
    );
    drawCircleContainer(tucanoCoordinates);


    

    let tucanoEyeDarkestFillColor;
    let tucanoEyeLightestFillColor;



    for(let counterEyeFactor = 1; 3 >= counterEyeFactor; counterEyeFactor ++){
      console.log(counterEyeFactor)


      switch(counterEyeFactor){
        case 1:
          tucanoEyeDarkestFillColor = "#720808";
          tucanoEyeLightestFillColor = "#901010";
          break;
        case 2:
          tucanoEyeDarkestFillColor = "#148DA6";
          tucanoEyeLightestFillColor = "#0B9BBA";
          break;
        case 3:
          tucanoEyeDarkestFillColor = "#000000";
          tucanoEyeLightestFillColor = "#000000";
          break;

      }
      console.log(tucanoEyeLightestFillColor)
      let tucanoEyeLightestFillColorRGB = hexToRgbCached(tucanoEyeLightestFillColor);
      let tucanoEyeDarkestFillColorRGB = hexToRgbCached(tucanoEyeDarkestFillColor);

      let tucanoEyesR = 3+ tucanoR/( 5 * counterEyeFactor);
      let tucanoStartX = avgX - tucanoR/10 ;
      let tucanoStartY = avgY - tucanoR/2.5;
      setHatchTexture(tucanoEyesR, tucanoEyeLightestFillColorRGB, tucanoEyeDarkestFillColorRGB);

      brush.circle(tucanoStartX, tucanoStartY, tucanoEyesR, false)

      
      
      
    }




  

  setHatchFill(tucanoR, tucanoBeakLightestFillColorRGB, tucanoBeakDarkestFillColorRGB);
  drawTucanBeak(
    tucanoCoordinates,
    tucanoR,
    tucanoBeakLightestFillColorRGB,
    tucanoBeakDarkestFillColorRGB
  );

  setHatchTexture(
    tucanoR,
    tucanoBeakLightestFillColorRGB,
    tucanoBeakDarkestFillColorRGB
  );


  drawTucanBeak(
    tucanoCoordinates,
    tucanoR,
    tucanoBeakLightestFillColorRGB,
    tucanoBeakDarkestFillColorRGB
  );



 for(let counterFactor = 0; 3 > counterFactor; counterFactor++){
  drawTucanoWings(
    tucanoCoordinates,
    tucanoR,
    counterFactor
  );

  setHatchTexture(
    tucanoR,
    tucanoBeakLightestFillColorRGB,
    tucanoBeakDarkestFillColorRGB
  );

  drawTucanoWings(
    tucanoCoordinates,
    tucanoR,
    counterFactor
  );
}

  
}

function drawTucanBeak(tucanoCoordinates, tucanoR) {
  const avgX =
    (tucanoCoordinates[0] +
      tucanoCoordinates[2] +
      tucanoCoordinates[4] +
      tucanoCoordinates[6]) /
    4;
  const avgY =
    (tucanoCoordinates[1] +
      tucanoCoordinates[3] +
      tucanoCoordinates[5] +
      tucanoCoordinates[7]) / 
    4;

  const centerX = avgX + tucanoR / 5;
  const centerY = avgY;

  brush.noStroke();
  brush.beginShape();
  brush.vertex(centerX, centerY);

  const startAngle = -PI / 3;
  const endAngle = startAngle + (2 * PI) / 2.75;
  const numPoints = 20;

  const randomCircleFactor = () => random(0.95, 1.05);
  const rotationAngle = - Math.PI / 6;

  for (let i = 0; i <= numPoints; i++) {
    const angle = lerp(startAngle, endAngle, i / numPoints);
    const originalX = centerX + tucanoR * cos(angle) * 0.55 * randomCircleFactor();
    const originalY = centerY + tucanoR * sin(angle) * 0.75 * randomCircleFactor();
    const rotatedX = Math.cos(rotationAngle) * (originalX - centerX) - Math.sin(rotationAngle) * (originalY - centerY) + centerX;
    const rotatedY = Math.sin(rotationAngle) * (originalX - centerX) + Math.cos(rotationAngle) * (originalY - centerY) + centerY;

    brush.vertex(rotatedX, rotatedY);
  }

  brush.vertex(centerX, centerY);
  brush.endShape(CLOSE);
}



function drawTucanoWings(tucanoCoordinates, tucanoR, counterFactor) {
  let mathFactor = counterFactor / 10;
  console.log(mathFactor);

  const avgX =
    (tucanoCoordinates[0] +
      tucanoCoordinates[2] +
      tucanoCoordinates[4] +
      tucanoCoordinates[6]) /
    4;
  const avgY =
    (tucanoCoordinates[1] +
      tucanoCoordinates[3] +
      tucanoCoordinates[5] +
      tucanoCoordinates[7]) /
    4;

  const centerX = avgX + tucanoR * 0.7 - tucanoR * (0.9 - mathFactor);
  const centerY = avgY + tucanoR * 0.1;

  brush.noStroke();
  brush.beginShape();
  brush.vertex(centerX, centerY);

  const startAngle = -1.5 * PI + mathFactor * 2;
  const endAngle = startAngle + mathFactor * 2 + (2 * PI) / 3;
  const numPoints = 3;

  // Set the rotation angle in radians
  const rotationAngle = -Math.PI / 6; // 30 degrees = π/6 radians

  for (let i = 0; i <= numPoints; i++) {
    const angle = lerp(startAngle, endAngle, i / numPoints);

    // Original coordinates before rotation
    const originalX = centerX + tucanoR * cos(angle) * 0.6;
    const originalY = centerY + tucanoR * sin(angle) * 0.7;

    // Apply 30-degree rotation
    const rotatedX = Math.cos(rotationAngle) * (originalX - centerX) - Math.sin(rotationAngle) * (originalY - centerY) + centerX;
    const rotatedY = Math.sin(rotationAngle) * (originalX - centerX) + Math.cos(rotationAngle) * (originalY - centerY) + centerY;

    brush.vertex(rotatedX, rotatedY);
  }

  brush.vertex(centerX, centerY);
  brush.endShape(CLOSE);
}

function drawTextContainer(productTitleFieldText,productDescFieldText){
  
  noStroke();
  fill("#EAEADC");
  rect(width * 0, height * 0.00, width * 0.22, height); 

  push();
  fill("#381233");
  textAlign(LEFT, CENTER);
  textSize(height / 10);
  textStyle(NORMAL);
  textFont(titleFont);
  translate(width * 0.13, height * 0.02);
  rotate(PI / 2);
  text(productTitleFieldText, 0, 0);
  pop();

  push();
  fill("#381233");
  textAlign(LEFT, CENTER);
  textSize(width / 60);
  textStyle(ITALIC);
  textFont(descFont);
  translate(width * 0.10, height * 0.725);
  rotate(PI / 2);
  text(productDescFieldText, 0, 0, height*0.245);
  pop();

}












function draw() {
  translate(-width / 2, -height / 2);

  const fruitRadius = fruitRadiusSlider.value/400 * height;
  const startX = 0 - fruitRadius * 2 + width*0.05;
  const startY = 0 - fruitRadius;

  const curveHeight = height;
  const curveWidth = width / 3;
  const angleOffset = 10 - angleOffsetSlider.value;

  const blankSpaceChance = 10 - blankSpaceChanceSlider.value;
  const curveSpacing = map(curveSpacingSlider.value, 0, 20, 3, 0.3);

  const fruitSpacing = fruitRadius * 1.2;
  const fruitsPerCurve = Math.floor(curveHeight / fruitSpacing);


  const productTitleFieldText = productTitleField.value
  const productDescFieldText = productDescriptionField.value


  if (random(1, 10) > blankSpaceChance) {
    if (frameCount <= fruitsPerCurve) {
      
      const t = (frameCount - 1) / (fruitsPerCurve - 1);
      const x = startX + curveWidth * cos(t * PI + angleOffset);
      const y = startY + curveHeight * t;
      pointsForSpline.push([(x * random(0.95,1.05)),(y * random(0.95,1.05))]);

      drawFruit(fruitRadius, x, y);
    } else {
      if(fruitsPerCurve == pointsForSpline.length){
        drawBranch(pointsForSpline,fruitRadius);

        pointsForSpline = [];

        for(let j = 0; j < pointsForFruit.length; j++){
          drawFruit(fruitRadius, pointsForFruit[j][0],pointsForFruit[j][1]);
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


  drawTextContainer(productTitleFieldText,productDescFieldText);
}








