let stars = [];
let factor = 100;
let canvasSize = 400;
let speedSlider;

function setup() {
  createCanvas(640, 360);
  speedSlider = createSlider(0, 20, 2, 0.1);

  for (let i = 0; i < 500; i++) {
    stars[i] = createVector(
      random(-width * factor, width * factor),
      random(-height * factor, height * factor),
      random(canvasSize)
    );
    stars[i].pz = stars[i].z;
  }
}

function draw() {
  background(30);
  translate(width / 2, height / 2);

  for (let star of stars) {
    let x = star.x / star.z;
    let y = star.y / star.z;
    let px = star.x / star.pz;
    let py = star.y / star.pz;

    let d = map(star.z, 0, canvasSize, 10, 1);

    fill(255);
    noStroke();
    circle(x, y, d);

    stroke(255);
    line(x, y, px, py);

    star.pz = star.z;
    star.z -= speedSlider.value();

    if (star.z < 1) {
      star.x = random(-width * factor, width * factor);
      star.y = random(-height * factor, height * factor);
      star.z = canvasSize;
      star.pz = canvasSize;
    }
  }
}
