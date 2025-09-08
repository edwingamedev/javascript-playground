var cells = [];
let history = [];
var ruleset;
var rule = 110;

var w = 5;

var container;
var paragraph;
var textInput;
var ruleSetSlider;

function setup() {
  createCanvas(640, 600);

  cells = new Array(floor(width / w));
  ruleset = decimalToBinaryArray(rule);

  container = createDiv();
  container.style("display", "flex");
  container.style("align-items", "center");
  container.style("gap", "20px");

  paragraph = createP("Rule 0 - 256");
  paragraph.parent(container);

  textInput = createInput(rule, "number");
  textInput.changed(onTextInputChanged);
  textInput.attribute("min", 0);
  textInput.attribute("max", 256);
  textInput.parent(container);

  ruleSetSlider = createSlider(0, 256, rule, 1);
  ruleSetSlider.changed(onSliderChanged);
  ruleSetSlider.parent(container);

  setNewRule();
}

function onSliderChanged() {
  textInput.value(ruleSetSlider.value());

  setNewRule();
}

function onTextInputChanged() {
  let val = parseInt(textInput.value());

  if (!isNaN(val)) {
    val = constrain(val, 0, 256);
    ruleSetSlider.value(val);
    textInput.value(val);
  }

  setNewRule();
}

function draw() {
  drawRule();
}

function setNewRule() {
  ruleset = decimalToBinaryArray(textInput.value());

  for (let i = 0; i < cells.length; i++) {
    cells[i] = 0;
  }

  cells[floor(cells.length / 2)] = 1;
}

function drawRule() {
  background(250);

  history.push(cells);

  let cols = height / w;

  if (history.length > cols + 1) {
    history.splice(0, 1);
  }

  let y = 0;

  // draw cells
  for (let genCells of history) {
    for (let i = 0; i < genCells.length; i++) {
      if (genCells[i] === 1) {
        let x = i * w;
        noStroke();
        fill(0);
        square(x, y - w, w);
      }
    }
    y += w;
  }

  let nextgen = cells.slice();
  let len = cells.length;
  // Calculate generation
  for (let i = 0; i < len; i++) {
    let left = cells[(i - 1 + len) % len];
    let state = cells[i];
    let right = cells[(i + 1) % len];
    nextgen[i] = CalculateState(left, state, right);
  }
  cells = nextgen;
}

function CalculateState(a, b, c) {
  let neighborhood = "" + a + b + c;
  let index = parseInt(neighborhood, 2);
  return ruleset[7 - index];
}

function decimalToBinaryArray(n) {
  let binString = (n >>> 0).toString(2).padStart(8, "0");
  let binArray = [];

  for (let i = 0; i < binString.length; i++) {
    binArray.push(int(binString[i]));
  }

  return binArray;
}
