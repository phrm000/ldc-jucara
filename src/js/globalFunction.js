
//Draw every branch
function drawBranch(points, fruitRadius) {
  const randomColor = random(1, 100);
  const colorR = map(randomColor, 1, 100, 85, 38);
  const colorG = map(randomColor, 1, 100, 48, 22);
  const colorB = map(randomColor, 1, 100, 17, 8);

  brush.set("2H", [colorR, colorG, colorB], map(fruitRadius, 30, 100, 10, 55));
  brush.spline(points, 1);
}
//Maps circle coordinates
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
//Creates base hatch fill coloring
function setHatchFill(shapeSize, lightRGB, darkRGB) {
  const randomColor = random(1, 100);

  const colorR = map(randomColor, 1, 100, lightRGB.r, darkRGB.r);
  const colorG = map(randomColor, 1, 100, lightRGB.g, darkRGB.g);
  const colorB = map(randomColor, 1, 100, lightRGB.b, darkRGB.b);

  brush.setHatch("charcoal", [colorR, colorG, colorB], shapeSize/5);
  brush.hatch(shapeSize/33, 0, {
    rand: 0,
    continuous: false,
    gradient: 0,
  });
}
//Creates texture hatch darker coloring
function setHatchTexture(shapeSize, lightRGB, darkRGB) {
  const randomColor = random(1, 50);
  const colorR = map(randomColor, 1, 100, lightRGB.r, darkRGB.r);
  const colorG = map(randomColor, 1, 100, lightRGB.g, darkRGB.g);
  const colorB = map(randomColor, 1, 100, lightRGB.b, darkRGB.b);

  brush.setHatch(
    "hatch_brush",
    [colorR, colorG, colorB],
    (random(2, 5) * shapeSize) / 100
  );
  brush.hatch(shapeSize / 100, 0, {
    rand: 0,
    continuous: true,
    gradient: 0.4,
  });
}
//Creates container for hatches
function drawCircleContainer(fruitCoordinates) {
  brush.noStroke();
  brush.beginShape(1);
  brush.vertex(fruitCoordinates[0], fruitCoordinates[1]);
  brush.vertex(fruitCoordinates[2], fruitCoordinates[3]);
  brush.vertex(fruitCoordinates[4], fruitCoordinates[5]);
  brush.vertex(fruitCoordinates[6], fruitCoordinates[7]);
  brush.endShape(CLOSE);
}

