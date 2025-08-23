let factor = 100;
let stars = [];
let starSize = 5;
let minStarHeight = 0;
function CreateStars(amount) {
  for (let i = 0; i < amount; i++) {
    stars[i] = createVector(
      random(-width * factor, width * factor),
      random(minStarHeight * factor, height * factor),
      random(canvasSize)
    );
    stars[i].pz = stars[i].z;
  }
}

function MoveStars(speed) {

  for (let star of stars) {
    let x = star.x / star.z;
    let y = star.y / star.z;
    let px = star.x / star.pz;
    let py = star.y / star.pz;

    let d = map(star.z, 0, canvasSize, starSize, 1);

    fill(255);
    noStroke();
    circle(x, y, d);

    stroke(255);
    line(x, y, px, py);

    star.pz = star.z;
    star.z -= speed;

    if (star.z < 1) {
      star.x = random(-width * factor, width * factor);
      star.y = random(-height * factor, height * factor);
      star.z = canvasSize;
      star.pz = canvasSize;
    }
  }
}
