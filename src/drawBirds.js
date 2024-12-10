function drawBirdWings(birdCoordinates, birdR, counterFactor) {
  let mathFactor = counterFactor / 10;

  const avgX =
    (birdCoordinates[0] +
      birdCoordinates[2] +
      birdCoordinates[4] +
      birdCoordinates[6]) /
    4;
  const avgY =
    (birdCoordinates[1] +
      birdCoordinates[3] +
      birdCoordinates[5] +
      birdCoordinates[7]) /
    4;

  const centerX = avgX + birdR * 0.7 - birdR * (0.9 - mathFactor);
  const centerY = avgY + birdR * 0.1;

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
    const originalX = centerX + birdR * cos(angle) * 0.6;
    const originalY = centerY + birdR * sin(angle) * 0.7;

    // Apply 30-degree rotation
    const rotatedX =
      Math.cos(rotationAngle) * (originalX - centerX) -
      Math.sin(rotationAngle) * (originalY - centerY) +
      centerX;
    const rotatedY =
      Math.sin(rotationAngle) * (originalX - centerX) +
      Math.cos(rotationAngle) * (originalY - centerY) +
      centerY;

    brush.vertex(rotatedX, rotatedY);
  }

  brush.vertex(centerX, centerY);
  brush.endShape(CLOSE);
}

function drawBirdBeak(birdCoordinates, birdR) {
  const avgX =
    (birdCoordinates[0] +
      birdCoordinates[2] +
      birdCoordinates[4] +
      birdCoordinates[6]) /
    4;
  const avgY =
    (birdCoordinates[1] +
      birdCoordinates[3] +
      birdCoordinates[5] +
      birdCoordinates[7]) /
    4;

  const centerX = avgX + birdR / 5;
  const centerY = avgY;

  brush.noStroke();
  brush.beginShape();
  brush.vertex(centerX, centerY);

  const startAngle = -PI / 3;
  const endAngle = startAngle + (2 * PI) / 2.75;
  const numPoints = 20;

  const randomCircleFactor = () => random(0.95, 1.05);
  const rotationAngle = -Math.PI / 5;

  for (let i = 0; i <= numPoints; i++) {
    const angle = lerp(startAngle, endAngle, i / numPoints);
    const originalX =
      centerX + birdR * cos(angle) * 0.55 * randomCircleFactor();
    const originalY =
      centerY + birdR * sin(angle) * 0.75 * randomCircleFactor();
    const rotatedX =
      Math.cos(rotationAngle) * (originalX - centerX) -
      Math.sin(rotationAngle) * (originalY - centerY) +
      centerX;
    const rotatedY =
      Math.sin(rotationAngle) * (originalX - centerX) +
      Math.cos(rotationAngle) * (originalY - centerY) +
      centerY;

    brush.vertex(rotatedX, rotatedY);
  }

  brush.vertex(centerX, centerY);
  brush.endShape(CLOSE);
}

function drawGralha(tucanoR, tucanoStartX, tucanoStartY) {
  // Colorize
  const tucanoDarkestFillColor = "#0B2969";
  const tucanoLightestFillColor = "#022B84";

  const tucanoDarkestFillColorRGB = hexToRgbCached(tucanoDarkestFillColor);
  const tucanoLightestFillColorRGB = hexToRgbCached(tucanoLightestFillColor);

  const tucanoBeakDarkestFillColor = "#00010F";
  const tucanoBeakLightestFillColor = "#06092F";

  const tucanoBeakLightestFillColorRGB = hexToRgbCached(
    tucanoBeakLightestFillColor
  );
  const tucanoBeakDarkestFillColorRGB = hexToRgbCached(
    tucanoBeakDarkestFillColor
  );

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

  for (let counterEyeFactor = 2; 3 >= counterEyeFactor; counterEyeFactor++) {
    switch (counterEyeFactor) {
      case 2:
        tucanoEyeDarkestFillColor = "#148DA6";
        tucanoEyeLightestFillColor = "#0B9BBA";
        break;
      case 3:
        tucanoEyeDarkestFillColor = "#000000";
        tucanoEyeLightestFillColor = "#000000";
        break;
    }

    let tucanoEyeLightestFillColorRGB = hexToRgbCached(
      tucanoEyeLightestFillColor
    );
    let tucanoEyeDarkestFillColorRGB = hexToRgbCached(
      tucanoEyeDarkestFillColor
    );

    let tucanoEyesR = 1 + tucanoR / (5 * counterEyeFactor);
    let tucanoStartX = avgX - tucanoR / 10;
    let tucanoStartY = avgY - tucanoR / 2.5;
    setHatchTexture(
      tucanoEyesR,
      tucanoEyeLightestFillColorRGB,
      tucanoEyeDarkestFillColorRGB
    );

    brush.circle(tucanoStartX, tucanoStartY, tucanoEyesR, false);
  }

  let randomHatchRadius = random(1, 1.25);

  setHatchTexture(
    tucanoR * randomHatchRadius,
    tucanoBeakLightestFillColorRGB,
    tucanoBeakDarkestFillColorRGB
  );

  drawBirdBeak(
    tucanoCoordinates,
    tucanoR,
    tucanoBeakLightestFillColorRGB,
    tucanoBeakDarkestFillColorRGB
  );

  for (let counterFactor = 0; 3 > counterFactor; counterFactor++) {
    setHatchTexture(
      tucanoR * randomHatchRadius,
      tucanoBeakLightestFillColorRGB,
      tucanoBeakDarkestFillColorRGB
    );

    drawBirdWings(tucanoCoordinates, tucanoR, counterFactor);
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

  const tucanoBeakLightestFillColorRGB = hexToRgbCached(
    tucanoBeakLightestFillColor
  );
  const tucanoBeakDarkestFillColorRGB = hexToRgbCached(
    tucanoBeakDarkestFillColor
  );

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

  for (let counterEyeFactor = 1; 3 >= counterEyeFactor; counterEyeFactor++) {
    switch (counterEyeFactor) {
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

    let tucanoEyeLightestFillColorRGB = hexToRgbCached(
      tucanoEyeLightestFillColor
    );
    let tucanoEyeDarkestFillColorRGB = hexToRgbCached(
      tucanoEyeDarkestFillColor
    );

    let tucanoEyesR = 1 + tucanoR / (5 * counterEyeFactor);
    let tucanoStartX = avgX - tucanoR / 10;
    let tucanoStartY = avgY - tucanoR / 2.5;
    setHatchTexture(
      tucanoEyesR,
      tucanoEyeLightestFillColorRGB,
      tucanoEyeDarkestFillColorRGB
    );

    brush.circle(tucanoStartX, tucanoStartY, tucanoEyesR, false);
  }

  let randomHatchRadius = random(0.9,1.2);
  setHatchTexture(
    tucanoR * randomHatchRadius,
    tucanoBeakLightestFillColorRGB,
    tucanoBeakDarkestFillColorRGB
  );

  drawBirdBeak(
    tucanoCoordinates,
    tucanoR,
    tucanoBeakLightestFillColorRGB,
    tucanoBeakDarkestFillColorRGB
  );

  setHatchTexture(
    tucanoR * randomHatchRadius,
    tucanoBeakLightestFillColorRGB,
    tucanoBeakDarkestFillColorRGB
  );

  for (let counterFactor = 0; 3 > counterFactor; counterFactor++) {
    drawBirdWings(tucanoCoordinates, tucanoR, counterFactor);
  }
}
