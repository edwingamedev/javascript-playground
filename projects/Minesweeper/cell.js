function Cell(i, j, w) {
  this.i = i;
  this.j = j;

  this.x = i * w;
  this.y = j * w;
  this.w = w;

  this.neighborCount = 0;
  this.displacement = w * 0.5;

  this.bomb = false;

  this.revealed = false;
}

const cellBackground = "#3264ffff";
const bombColor = "#323269ff";

Cell.prototype.show = function () {
  stroke(25);
  noFill();
  rect(this.x, this.y, this.w, this.w);

  if (!this.revealed) {
    return;
  }

  if (this.bomb) {
    _drawBomb(this);
    return;
  }

  _drawCell(this);
};

function _drawCell(cell) {
  fill(cellBackground);
  rect(cell.x, cell.y, cell.w, cell.w);

  // display number
  if (cell.neighborCount > 0) {
    textAlign(CENTER);
    textSize(20);
    fill(255);
    text(
      cell.neighborCount,
      cell.x + cell.displacement,
      cell.y + cell.displacement + 8
    );
  }
}

function _drawBomb(cell) {
  rect(cell.x, cell.y, cell.w, cell.w);
  fill(bombColor);
  ellipse(
    cell.x + cell.displacement,
    cell.y + cell.displacement,
    cell.displacement
  );
}

Cell.prototype.countBombs = function () {
  if (this.bomb) {
    this.neighborCount = -1;
    return;
  }

  var total = 0;

  for (var xoff = -1; xoff <= 1; xoff++) {
    for (var yoff = -1; yoff <= 1; yoff++) {
      var i = this.i + xoff;
      var j = this.j + yoff;
      if (i > -1 && i < cols && j > -1 && j < rows) {
        var neighbor = grid[i][j];
        if (neighbor.bomb) {
          total++;
        }
      }
    }
  }

  this.neighborCount = total;
};

Cell.prototype.reveal = function () {
  this.revealed = true;

  if (this.neighborCount == 0) {
    // flood fill
    this.floodFill();
  }
};

Cell.prototype.floodFill = function () {
  for (var xoff = -1; xoff <= 1; xoff++) {
    for (var yoff = -1; yoff <= 1; yoff++) {
      var i = this.i + xoff;
      var j = this.j + yoff;
      if (i > -1 && i < cols && j > -1 && j < rows) {
        var neighbor = grid[i][j];
        if (!neighbor.bomb && !neighbor.revealed) {
          neighbor.reveal();
        }
      }
    }
  }
};
