let music, img, fft, playbackRateSlider;

function preload() {
  // If using mac/web editor, change '\\' to '/'
  music = loadSound('audio\\drmove.mp3');
  img = loadImage('image\\Macintosh Plus - Floral Shoppe.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fft = new p5.FFT();
  playbackRateSlider = createSlider(0.75, 1, 1, 0.01); // min, max, [default value], [step]
  fill(255, 255, 255);
  playbackRateSlider.position(35, 5);
}

function draw() {
  /* Background */
  background(0);
  if (music.isPlaying()) {
    let opacity = map(playbackRateSlider.value(), 0.75, 1, 126, 0, true);
    tint(255, opacity); // Change opacity (0 - half)
    image(img, 0, 0, windowWidth, windowHeight);
  }

  /* Audio visualizer */
  stroke(255);
  noFill();
  let waveform = fft.waveform();
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, 0, height);
    vertex(x, y);
  }
  endShape();

  /* Play button */
  if (music.isPlaying()) {
    fill('#00FF00'); // Green
  } else {
    fill('#FF0000'); // Red
  }
  rect(0, 0, 30);

  /* Text of the playback rate value */
  fill(255, 255, 255);
  textSize(32);
  text(playbackRateSlider.value(), 180, 27);

  /* Change playback rate*/
  music.rate(playbackRateSlider.value());
}

function mouseClicked() {
  /* Play/pause music by clicking the top left play button */
  if (mouseX <= 30 && mouseY <= 30) {
    if (!music.isPlaying()) {
      music.play();
    } else {
      music.pause();
    }
  }
}
