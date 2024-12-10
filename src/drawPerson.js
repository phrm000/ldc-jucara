let nosePoints = [
    [0.5, 0],
    [-5.5, 12],
    [0.5, 25],
    [5.5, 26.67],
    [10.5, 28.33],
    [15.5, 30],
    [18.83, 27.5],
    [22.17, 25],
    [25.5, 23.5],
    [28.83, 25.83],
    [32.17, 29.17],
    [30.5, 32.5],
    [32.17, 35.83],
    [28.83, 39.17],
    [25.5, 42.5]
];

let mouthPoints = [
    [0.45, -0.22],
    [6.32, -12.35],
    [2.49, -22.07]
];

let eyebrownsPoints = [
    [-0.45, 0.22],
    [-6.32, 12.35],
    [-2.49, 22.07]
];

function drawPerson(personR, personStartX, personStartY) {
    const colorSkin = random(0, 100);
    const colorSet =
    colorSkin > 66
        ? { darkest: "#FB5847", lightest: "#FF876E" }
        : colorSkin > 33
        ? { darkest: "#C0551C", lightest: "#BE4B17" }
        : { darkest: "#702C0C", lightest: "#B2420F" };
  
    const personDarkestFillColorRGB = hexToRgbCached(colorSet.darkest);
    const personLightestFillColorRGB = hexToRgbCached(colorSet.lightest);
  
    const personCoordinates = randomCircleCoordinates(
      personR,
      personStartX,
      personStartY
    );
  
    const avgX =
    (personCoordinates[0] +
      personCoordinates[2] +
      personCoordinates[4] +
      personCoordinates[6]) /
    4;
  const avgY =
    (personCoordinates[1] +
      personCoordinates[3] +
      personCoordinates[5] +
      personCoordinates[7]) /
    4;
  
    setHatchFill(personR, personLightestFillColorRGB, personDarkestFillColorRGB);
    drawCircleContainer(personCoordinates);
  
    setHatchTexture(personR, personLightestFillColorRGB, personDarkestFillColorRGB);
    drawCircleContainer(personCoordinates);
  
    drawSplineWithBrush(avgX,avgY,personR);

    let personEyeDarkestFillColorRGB = hexToRgbCached("#000000");
    let personEyeLightestFillColorRGB = hexToRgbCached("#000000");

    setHatchTexture(
        personR,
        personEyeLightestFillColorRGB,
        personEyeDarkestFillColorRGB
      );
      brush.circle(avgX,avgY + personR/7, personR/11, false);
}

function drawSplineWithBrush(avgX,avgY,shapeSize) {
    let scaledPoints;
    
    brush.push()
    const randomCircleFactor = () => random(0.9, 1.04);
    push();
    translate(avgX - shapeSize/10 ,avgY - shapeSize/1.8 );
    brush.set("cpencil", "#3B0B1A", shapeSize / 10);
    scaledPoints = nosePoints.map(([x, y]) => [x * randomCircleFactor()*shapeSize/70, y * randomCircleFactor()*shapeSize/70]);
    brush.spline(scaledPoints, 0.8);
    pop();

    push();
    translate(avgX-shapeSize/10,avgY);
    brush.set("cpencil", "#3B0B1A", shapeSize / 10);
    scaledPoints = eyebrownsPoints.map(([x, y]) => [x * shapeSize/70* randomCircleFactor(), y * shapeSize/70 * randomCircleFactor()]);
    brush.spline(scaledPoints, 0.8);
    pop();
    brush.pop();

    brush.push();
    push();
    translate(avgX +shapeSize/2.5 ,avgY + shapeSize/10);
    brush.set("cpencil", "#000000", shapeSize / 10);
    scaledPoints = mouthPoints.map(([x, y]) => [x * shapeSize/70* randomCircleFactor(), y * shapeSize/70 * randomCircleFactor()]);
    brush.spline(scaledPoints, 0.8);
    pop();
    brush.pop();
}
