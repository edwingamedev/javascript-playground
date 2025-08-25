const canvasSize = 512;
const bgColor = "#102b2bff";
const textOffset = 5;

var order;
var N;
var total;
var path;
var counter = 0;
var orderSlide;
var sliderText;
var speed = 1;
var sliderText2;
var speedSlide;
var redraw;

function Init() {
  order = orderSlide.value();
  N = floor(pow(2, order));
  total = N * N;
  path = [];
  counter = 0;
  redraw = true;

  for (let i = 0; i < total; i++) {
    path[i] = hilbert(i);
    let len = width / N;
    path[i].mult(len);
    path[i].add(len / 2, len / 2);
  }

  sliderText.html("order: " + orderSlide.value());

  setSpeed();
}

function setSpeed() {
  if (speedSlide.value() == speedSlide.elt.max) {
    speed = total;
    sliderText2.html("instant");
    return;
  }
  speed = speedSlide.value();
  sliderText2.html("speed:" + speed);
}

function setup() {
  createCanvas(canvasSize, canvasSize);
  colorMode(HSB, 360, 255, 255);

  // Order
  orderSlide = createSlider(1, 8, 4, 1);
  orderSlide.position(0, height);
  orderSlide.input(Init);

  sliderText = createSpan(orderSlide.value());
  sliderText.position(orderSlide.x + orderSlide.width + 10, height);

  // Speed
  speedSlide = createSlider(1, 101, 1, 1);
  speedSlide.position(sliderText.x + sliderText.width + 50, height);

  speedSlide.input(setSpeed);

  sliderText2 = createSpan(speedSlide.value());
  sliderText2.position(speedSlide.x + speedSlide.width + 20, height);
  sliderText2.html("speed:" + speed);

  stroke(255);
  strokeWeight(2);
  Init();
}

function drawPath(upTo) {
  for (let i = 1; i < upTo; i++) {
    let h = map(i, 0, path.length, 0, 360);
    stroke(h, 255, 255);
    line(path[i].x, path[i].y, path[i - 1].x, path[i - 1].y);
  }
}

function draw() {
  if (!redraw) {
    return;
  }

  background(0);
  drawPath(counter);

  counter += speed;

  // if finished, do one last full draw and stop
  if (counter >= path.length) {
    counter = path.length;
    drawPath(counter);
    redraw = false;
  }
}

function hilbert(i) {
  let points = [];

  points.push(createVector(0, 0));
  points.push(createVector(0, 1));
  points.push(createVector(1, 1));
  points.push(createVector(1, 0));

  let index = i & 3;
  let v = points[index];

  let temp;

  for (let j = 1; j < order; j++) {
    i = i >>> 2;
    index = i & 3;
    let len = pow(2, j);

    switch (index) {
      case 0:
        temp = v.x;
        v.x = v.y;
        v.y = temp;
        break;
      case 1:
        v.y += len;
        break;
      case 2:
        v.x += len;
        v.y += len;
        break;
      case 3:
        temp = len - 1 - v.x;
        v.x = len - 1 - v.y;
        v.y = temp;

        v.x += len;
        break;
    }
  }
  return v;
}
