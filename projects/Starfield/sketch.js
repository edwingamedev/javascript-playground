let speedSlider;
let canvasSize = 640;
let starsAmount = 500;

function setup() {
  createCanvas(640, 360);
  speedSlider = createSlider(0, 20, 2, 0.1);
  minStarHeight = -height;
  
  CreateStars(starsAmount);
}

function draw() {
  background(30);
  translate(width / 2, height / 2);
  MoveStars(speedSlider.value());
}