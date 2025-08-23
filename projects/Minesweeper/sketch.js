var grid;
var cols;
var rows;
var w = 40;
var totalBombs = 20;
var isGameOver = false;
const colorBlue = [100, 200, 255];

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }

  return arr;
}

function setup() {
  createCanvas(601, 601);
  InitGame();
}

function InitGame(){
  isGameOver = false;
  cols = floor(width / w);
  rows = floor(height / w);

  grid = make2DArray(cols, rows);

  //create the grid
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }

  // pick total bombs spots
  var options = [];
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }

  for (var n = 0; n < totalBombs; n++) {
    var index = floor(random(options.length));
    var choice = options[index];
    var i = choice[0];
    var j = choice[1];

    // deletes the spot so it's no longer an option
    options.splice(index, 1);

    grid[i][j].bomb = true;
  }

  //count neighbors
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].countBombs();
    }
  }
}

function gameOver() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].reveal();
    }
  }
  isGameOver = true;
}

function mousePressed() {
  background(100, 200, 255);

  if(isGameOver){
    InitGame();
    return;
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].reveal();

        if (grid[i][j].bomb) {
          gameOver();
        }
      }
    }
  }
}

function draw() {
  background(100, 200, 255);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}
