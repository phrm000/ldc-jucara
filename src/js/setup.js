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

  audioFiles["fruit"] = [
    loadSound("sounds/trees1.mp3"),
    loadSound("sounds/trees2.mp3"),
  ];
  audioFiles["tucano"] = [
    loadSound("sounds/tucan1.mp3"),
    loadSound("sounds/tucan2.mp3"),
    loadSound("sounds/tucan3.mp3"),
  ];
  audioFiles["gralha"] = [
    loadSound("sounds/gralha1.mp3"),
    loadSound("sounds/gralha2.mp3"),
  ];
  audioFiles["person"] = [
    loadSound("sounds/person1.mp3")
    
  ];

}

function setup() {
  C.createCanvas();
  background("#EAEADC");
  angleMode(RADIANS);
  textFont(titleFont);

  for (let category in audioFiles) {
    audioFiles[category].forEach((audio) => {
      let gain = new p5.Gain();
      gain.setInput(audio); // Connect the sound file to the gain node
      gain.connect(); // Connect the gain node to the output
      gains.push(gain);

      // Create a set of effects for each sound
      effects.push({
        reverb: new p5.Reverb(),
        delay: new p5.Delay(),
        filter: new p5.Filter(),
        distortion: new p5.Distortion(),
        pan: random(-1, 1), // Random pan from left to right
      });
    });
  }


  // translate(-width / 2, -height / 2);
  // drawPerson(100,+100,0);
}
//Redraws entire canvas on activation
function restart(){
  background("#EAEADC");
  frameCount = 0;
  fruitsPerCurve = 0;
  pointsForSpline = [];

  for (let category in audioFiles) {
    if (audioFiles[category]) {
      audioFiles[category].forEach((audio) => {
        if (audio.isPlaying()) {
          audio.stop(); // Stop the audio if it's currently playing
        }
      });
    }
  }

  // Reset gains
  gains.forEach((gain) => {
    gain.amp(0); // Reset volume to 0
  });

  // Reset effects
  effects.forEach((effectSet) => {
    effectSet.reverb.drywet(0); // Reset reverb
    effectSet.delay.drywet(0); // Reset delay
    effectSet.filter.freq(0); // Reset filter frequency
    effectSet.distortion.drywet(0); // Reset distortion
    effectSet.pan = 0; // Reset pan
  });

  // Reset sound index
  soundIndex = 0;
  
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