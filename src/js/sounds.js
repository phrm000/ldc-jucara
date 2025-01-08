let audioFiles = {}; 
let gains = []; 
let effects = []; 
let soundIndex = 0; 

function playAudio(category) {
  if (audioFiles[category]) {
    // Randomly select an audio file from the category
    let audioIndex = Math.floor(random(0, audioFiles[category].length));
    let audio = audioFiles[category][audioIndex];
    let gain = gains[soundIndex]; // Use the corresponding gain node
    let effectSet = effects[soundIndex]; // Use the corresponding effect set

    // Randomize effect parameters
    let wetness = random(0.1, 0.5); // Reverb wetness
    let delayTime = random(0.1, 0.5); // Delay time

    let randomDelay = random(5000, 10000); // Random delay 
    let randomDuration = random(8000, 10000); // Random duration 

    // Apply effects
    if (category == "gralha" || category == "tucano") {
    effectSet.reverb.process(audio, random(1, 5), wetness);
    effectSet.delay.process(audio, delayTime, 0.5, random(0.2, 0.6)); // Feedback and delay amount
    }
    audio.pan(effectSet.pan); // Apply pan


    let randomVolume = random(0.3, 0.7); // Set random volume 
    gain.amp(randomVolume, 0.5); 

    // Play the audio file
    audio.play();

   
    setTimeout(() => {
      gain.amp(0, 1); // Smooth fade-out over 1 second
      audio.stop(); 
    }, randomDuration);

    // Next playback with a random delay
    setTimeout(() => playAudio(category), randomDelay);

    
    soundIndex = (soundIndex + 1) % gains.length;
  }
}
