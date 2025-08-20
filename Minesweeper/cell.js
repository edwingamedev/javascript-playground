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

const cellBackground = [50, 100, 255];
const bombColor = [50, 50, 105];

Cell.prototype.show = function () {
  stroke(25);
  noFill();
  rect(this.x, this.y, this.w, this.w);

  if (this.revealed) {
    if (this.bomb) {
      rect(this.x, this.y, this.w, this.w);
      fill(bombColor);
      ellipse(
        this.x + this.displacement,
        this.y + this.displacement,
        this.displacement
      );
    } else {
      fill(cellBackground);
      rect(this.x, this.y, this.w, this.w);
      if (this.neighborCount > 0) {
        textAlign(CENTER);
        textSize(20);
        fill(255);
        text(
          this.neighborCount,
          this.x + this.displacement,
          this.y + this.displacement + 8
        );
      }
    }
  }
};

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

Cell.prototype.contains = function (x, y) {
  return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w;
};

Cell.prototype.reveal = function () {
  this.revealed = true;

  if (this.neighborCount == 0) {
    // floor fill
    this.floorFill();
  }
};

Cell.prototype.floorFill = function () {
  for (var xoff = -1; xoff <= 1; xoff++) {
    for (var yoff = -1; yoff <= 1; yoff++) {
      var i = this.i + xoff;
      var j = this.j + yoff;
      if (i > -1 && i < cols && j > -1 && j < rows) {
        var neighbor = grid[i][j];
        if(!neighbor.bomb && !neighbor.revealed){
          neighbor.reveal();
        }
      }
    }
  }
}