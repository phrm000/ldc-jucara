
//draws Juçara fruit with 3 different stages of maturation
function drawFruit(fruitR, fruitStartX, fruitStartY) {
  const stage = random(0, 100);
  const colorSet =
    stage > 25
    ? { darkest: "#19011B", lightest: "#490720" }
    : stage > 10
    ? { darkest: "#19310A", lightest: "#26680C" }
    : { darkest: "#39230F", lightest: "#432A16" };
  
  const fruitDarkestFillColorRGB = hexToRgbCached(colorSet.darkest);
  const fruitLightestFillColorRGB = hexToRgbCached(colorSet.lightest);
  
  const fruitCoordinates = randomCircleCoordinates(
    fruitR,
    fruitStartX,
    fruitStartY
  );
  
  setHatchFill(fruitR, fruitLightestFillColorRGB, fruitDarkestFillColorRGB);
  drawCircleContainer(fruitCoordinates);
  
  setHatchTexture(fruitR, fruitLightestFillColorRGB, fruitDarkestFillColorRGB);
  drawCircleContainer(fruitCoordinates);
  
  drawFruitStem(
    fruitCoordinates,
    fruitR,
    fruitLightestFillColorRGB,
    fruitDarkestFillColorRGB
  );
}
  

//draws Fruit Steam based on the center of the circle
function drawFruitStem(fruitCoordinates, shapeSize, lightRGB, darkRGB) {
const avgX =
  (fruitCoordinates[0] +
  fruitCoordinates[2] +
  fruitCoordinates[4] +
  fruitCoordinates[6]) / 4;
const avgY =
  (fruitCoordinates[1] +
  fruitCoordinates[3] +
  fruitCoordinates[5] +
  fruitCoordinates[7]) / 4;

const randomColor = random(75, 100);
const colorR = map(randomColor, 1, 100, lightRGB.r, darkRGB.r);
const colorG = map(randomColor, 1, 100, lightRGB.g, darkRGB.g);
const colorB = map(randomColor, 1, 100, lightRGB.b, darkRGB.b);

brush.set("cpencil", [colorR, colorG, colorB], shapeSize / 5);
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
