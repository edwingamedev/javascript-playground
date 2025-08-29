const colorBlue = "rgb(100, 200, 255)";
var bgColor = "#092018ff";
const canvasSize = 512;
const imagePath = "/assets/logox512.png";
var imageToRender;

function preload() {
  imageToRender = loadImage(imagePath);
}

function setup() {
  background(bgColor);
  createCanvas(canvasSize, canvasSize);
  //image(imageToRender, 0, 0, width, height);

  let w = width / imageToRender.width;
  let h = height / imageToRender.height;

  imageToRender.loadPixels();

  for (let i = 0; i < imageToRender.width; i++) {
    for (let j = 0; j < imageToRender.height; j++) {
      const pixelIndex = (i + j * imageToRender.width) * 4;
      const r = imageToRender.pixels[pixelIndex + 0];
      const g = imageToRender.pixels[pixelIndex + 1];
      const b = imageToRender.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      noStroke();
      fill(avg);
      square(i * w, j * h, w);
    }
  }
}

function draw() {}
