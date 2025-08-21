const CTX = document.getElementById("ctx").getContext("2d");

const CTX_WIDTH = document.getElementById("ctx").width;
const CTX_HEIGHT = document.getElementById("ctx").height;

const UNIT_W = CTX_WIDTH / 20;
const UNIT_H = CTX_HEIGHT / 20;

const PLAYER_START_X = CTX_WIDTH / 2 - UNIT_W;
const PLAYER_START_Y = CTX_HEIGHT / 2 - UNIT_H;

var gameFrameRate = 150;

var tailSize = 0;
var tail = [];
var food = {};
var player = {};

collision = function () {
  //food collision
  if (player.x == food.x && player.y == food.y) {
    tailSize++;
    createFood();
  }

  //tail collision
  if (tailSize > 0) {
    for (var i = 0; i < Object.keys(tail).length; i++) {
      if (player.x == tail[i].x && player.y == tail[i].y) {
        startSettings();
      }
    }
  }
};

createPlayer = function () {
  properties = {
    x: PLAYER_START_X,
    y: PLAYER_START_Y,
    direction: "right",
    color: "red",
  };

  player = properties;
};

createFood = function () {
  properties = {
    x: Math.round(Math.random() * ((CTX_WIDTH - UNIT_W) / UNIT_W)) * UNIT_W,
    y: Math.round(Math.random() * ((CTX_HEIGHT - UNIT_H) / UNIT_H)) * UNIT_H,
    color: "yellow",
  };
  food = properties;
};

tailHandler = function () {
  if (tailSize > 0) {
    for (var i = 0; i < Object.keys(tail).length - 1; i++) {
      tail[i] = tail[i + 1];
    }

    tail[tailSize - 1] = {
      x: player.x,
      y: player.y,
    };
  }
};

drawObject = function (obj) {
  //SAVE PREVIOUS PROPERTIES
  CTX.save();

  if (obj !== tail) {
    //COLOR
    CTX.fillStyle = obj.color;
    CTX.fillRect(obj.x, obj.y, UNIT_W, UNIT_H);

    //RESTORE PREVIOUS PROPERTIES
    CTX.restore();
    return;
  }

  CTX.fillStyle = player.color;

  if (tailSize > 0) {
    for (var i = 0; i < tailSize; i++) {
      CTX.fillRect(obj[i].x, obj[i].y, UNIT_W, UNIT_H);
    }
  }

  //RESTORE PREVIOUS PROPERTIES
  CTX.restore();
};

updatePosition = function () {
  //handler tail
  tailHandler();

  switch (player.direction) {
    case "right":
      player.x += UNIT_W;
      break;
    case "left":
      player.x -= UNIT_W;
      break;
    case "up":
      player.y -= UNIT_H;
      break;
    case "down":
      player.y += UNIT_H;
      break;
  }

  //RESET X
  if (player.x > CTX_WIDTH - UNIT_W) {
    player.x = 0;
  } else if (player.x < 0) {
    player.x = CTX_WIDTH - UNIT_W;
  }

  //RESET Y
  if (player.y > CTX_HEIGHT - UNIT_H) {
    player.y = 0;
  } else if (player.y < 0) {
    player.y = CTX_HEIGHT - UNIT_H;
  }
};

document.onkeydown = function (event) {
  if (event.keyCode === 68) {
    // d RIGHT
    if (player.direction != "left" || tailSize <= 0) {
      player.direction = "right";
    }
  }

  if (event.keyCode === 83) {
    // s DOWN
    if (player.direction != "up" || tailSize <= 0) {
      player.direction = "down";
    }
  }

  if (event.keyCode === 65) {
    // a LEFT
    if (player.direction != "right" || tailSize <= 0) {
      player.direction = "left";
    }
  }

  if (event.keyCode === 87) {
    // w UP
    if (player.direction != "down" || tailSize <= 0) {
      player.direction = "up";
    }
  }
};

document.oncontextmenu = function (event) {
  event.preventDefault();
};

gameLoop = function () {
  CTX.clearRect(0, 0, CTX_WIDTH, CTX_HEIGHT);

  //collision
  collision();

  //FOOD
  drawObject(food);

  //PLAYER POSITION
  updatePosition();

  //Player
  drawObject(player);

  drawObject(tail);
};

startSettings = function () {
  tail = [];
  tailSize = 0;
  createFood();
  createPlayer();
};

//Creater Player
startSettings();

//GAME LOOP
setInterval(gameLoop, gameFrameRate);
