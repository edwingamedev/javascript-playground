var tree;
var numbers = [];
var numbersString="";

function setup() {
  createCanvas(640, 360);
  background(30);

  tree = new Tree();

  for (var i = 0; i < 20; i++) {
    let number = floor(random(0, 100));
    numbersString += number+', ';
    tree.addValue(number);
  }

  bottomSection();

  tree.traverse();
}

bottomSection = function () {
  fill(255,100,125);
  rect(0, height - 30, width, 30);
  fill(255);
  noStroke();
  textAlign(CENTER);

  text(numbersString,  width / 2, height - 10);
};
