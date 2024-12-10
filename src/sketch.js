let pointsForSpline = [];
let pointsForFruit = [];

//Draw each branch spline
function drawBranch(points, fruitRadius) {
  const randomColor = random(1, 100);
  const colorR = map(randomColor, 1, 100, 85, 38);
  const colorG = map(randomColor, 1, 100, 48, 22);
  const colorB = map(randomColor, 1, 100, 17, 8);

  brush.set("2H", [colorR, colorG, colorB], map(fruitRadius, 30, 100, 10, 55));
  console.log("The points are: " + points)
  brush.spline(points, 1);
}




function drawTextContainer(productTitleFieldText, productDescFieldText) {
  noStroke();
  fill("#EAEADC");
  rect(width * 0, height * 0.0, width * 0.22, height);

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
  translate(width * 0.1, height * 0.725);
  rotate(PI / 2);
  text(productDescFieldText, 0, 0, height * 0.245);
  pop();
}


function draw() {
  if(isPaused == false){
  console.log(frameCount)

  translate(-width / 2, -height / 2);
  const fruitRadius = (fruitRadiusSlider.value / 400) * height;
  const startX = 0 - fruitRadius * 2 + width * 0.05;
  const startY = 0 - fruitRadius;
  const curveHeight = height;
  const curveWidth = width / 3;
  const angleOffset = map(angleOffsetSlider.value,0,10,0,10);

  const blankSpaceChance = 10 - blankSpaceChanceSlider.value;
  const curveSpacing =
    (fruitRadius / 40) * map(curveSpacingSlider.value, 0, 20, 1.5, 0.15);

  const fruitSpacing = fruitRadius * 1.2;
  const fruitsPerCurve = Math.floor(curveHeight / fruitSpacing);

  const productTitleFieldText = productTitleField.value;
  const productDescFieldText = productDescriptionField.value;


    if (frameCount <= fruitsPerCurve) {
      const t = (frameCount - 1) / (fruitsPerCurve - 1);
      const x = startX + curveWidth * cos(t * PI + angleOffset);
      const y = startY + curveHeight * t;
      pointsForSpline.push([x * random(0.95, 1.05), y * random(0.95, 1.05)]);
      pointsForSpline = [];
      drawComponent(fruitRadius, x, y);
    } else {
      if (fruitsPerCurve <= pointsForSpline.length) {
        drawBranch(pointsForSpline, fruitRadius);
        pointsForSpline = [];
        for (let j = 0; j < pointsForFruit.length; j++) {
          if(blankSpaceChance => random(1,10)){
            drawComponent(
              fruitRadius,
              pointsForFruit[j][0],
              pointsForFruit[j][1]
            );
        }
        }
        pointsForFruit = [];
      }

      const curveIndex = Math.floor((frameCount - 1) / fruitsPerCurve);
      const t = ((frameCount - 1) % fruitsPerCurve) / (fruitsPerCurve - 1);
      const x =
        startX +
        curveWidth * cos(t * PI + angleOffset) +
        curveIndex * (curveWidth * curveSpacing);
      const y = startY + curveHeight * t;
      pointsForFruit.push([x, y]);
      pointsForSpline.push([x * random(0.95, 1.05), y * random(0.95, 1.05)]);
      
    }
  

  drawTextContainer(productTitleFieldText, productDescFieldText);
}
}

function drawComponent(radius, x, y) {
  let componentSelection = random(0, 100);
  if (componentSelection <= 75) {
    drawFruit(radius, x, y);
  } else if (componentSelection <= 87) {
    drawTucano(radius, x, y);
  } else {
    drawGralha(radius, x, y);
  }
}
