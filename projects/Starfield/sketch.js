let speedSlider;
let canvasSize = 640;
let starsAmount = 500;

var speedText;
var container;

function setup() {
  createCanvas(640, 360);

  container = createDiv();
  container.style("display", "flex");
  container.style("align-items", "center");
  container.style("gap", "10px");

  speedText = createSpan("Speed");
  speedSlider = createSlider(0, 20, 2, 0.1);

  speedText.parent(container);
  speedSlider.parent(container);

  minStarHeight = -height;

  CreateStars(starsAmount);
}

function draw() {
  background(30);
  translate(width / 2, height / 2);
  MoveStars(speedSlider.value());
}