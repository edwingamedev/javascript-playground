let txt;
let justifiedTxt;
let y = 0;
let font;

let centerX;
let centerY;
let scrollToY;
let lineSpaceCharacter = "\u00A0";
let maxWidth = 28;

let canvasSize = 600;
let starsSpeed = 0.1;

function preload() {
  txt = loadStrings("message.txt");
  font = loadFont("cubicfive10_edit.ttf");
}

function setup() {
  createCanvas(1200, 600, WEBGL);
  starSize = 2;
  minStarHeight = -height / 4;
  CreateStars(400);

  textFont(font);
  const words = split(txt[0], " ");
  justifiedTxt = fullJustify(words, maxWidth).join("\n");

  sizeX = width;
  centerX = sizeX / 2;
  centerY = height / 2 - height / 10;
  //centerY = height - height / 10;
  y = centerY;
  scrollToY = -height * 6;
}

function draw() {
  background(0);
  translate(0, minStarHeight);
  MoveStars(starsSpeed);
  translate(-sizeX / 2, -minStarHeight + (height / 2));

  fill(238, 213, 75);
  textSize(width * 0.05);

  rotateX(PI / 3);
  text(justifiedTxt, 0, y, sizeX, height * 10);

  y -= 1;

  if (y < scrollToY) {
    y = centerY;
  }
}

function fullJustify(words, maxWidth) {
  let lines = [];
  (() => {
    let lin = [];
    let wid = 0;
    for (const word of words) {
      const newWidth = lin.length == 0 ? word.length : wid + 1 + word.length;
      if (newWidth > maxWidth) {
        lines.push(lin);
        lin = [];
        lin.push(word);
        wid = word.length;
      } else {
        lin.push(word);
        wid = newWidth;
      }
    }
    if (lin.length != 0) lines.push(lin);
  })();
  let ret = [];
  for (let i = 0; i < lines.length - 1; ++i) {
    ret.push(justify(lines[i], maxWidth));
  }
  ret.push(
    justify([lines[lines.length - 1].join(lineSpaceCharacter)], maxWidth)
  );
  return ret;
}

function justify(lin, maxWidth) {
  if (lin.length < 2) {
    let sb = "";
    if (lin.length == 1) sb += lin[0];
    while (sb.length < maxWidth) sb += lineSpaceCharacter;
    return sb;
  }
  let spaces = [];
  for (let i = 0; i < lin.length - 1; ++i) spaces[i] = 1;
  let wid = lin.map((w) => w.length).reduce((a, b) => a + b) + spaces.length;
  while (wid < maxWidth) {
    for (let i = 0; i < spaces.length; ++i) {
      ++spaces[i];
      ++wid;
      if (wid == maxWidth) break;
    }
  }
  let sb = "";
  for (let i = 0; i < spaces.length; ++i) {
    sb += lin[i];
    for (let s = 0; s < spaces[i]; ++s) sb += lineSpaceCharacter;
  }
  sb += lin[lin.length - 1];
  return sb;
}
