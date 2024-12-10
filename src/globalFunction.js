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
  
  const colorCache = {};
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