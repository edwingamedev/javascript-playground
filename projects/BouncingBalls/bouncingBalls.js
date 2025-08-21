var ctx = document.getElementById("ctx").getContext("2d");
ctx.font = "30px Verdana";
ctx.fillStyle = "white";

var WIDTH = 500;
var HEIGHT = 500;

var unitWidth = 20;
var unitHeight = 20;

var upgradeCategory = ["score", "atkSpd"];

var x = 50;
var spdX = 30;
var y = 40;
var spdY = 5;
var unitStartHP = 10;

var unitList = {};
var player = {};
var upgradeList = {};
var bulletList = {};

var timeGameStarted = Date.now();

var frameCount = 0;
var numOfEnemys = 0;
var score = 0;

unitCreator = function (numOfUnits) {
  for (var i = 0; i < numOfUnits; i++) {
    randomlyGenerateUnit();
  }
};

randomlyGenerateUnit = function () {
  var _id = numOfEnemys;

  var _x = Math.random() * WIDTH;
  var _y = Math.random() * HEIGHT;

  var _spdX = 10 + Math.random() * 10;
  var _spdY = 10 + Math.random() * 10;

  unit(_id, _x, _y, _spdX, _spdY, "red", 0);
  numOfEnemys++;
};

unit = function (_id, _x, _y, _spdX, _spdY, _color, _atkSpd) {
  var properties = {
    id: _id,
    x: _x,
    y: _y,
    spdX: _spdX,
    spdY: _spdY,
    width: unitWidth,
    height: unitHeight,
    hp: unitStartHP,
    color: _color,
    atkSpd: _atkSpd,
    atkCounter: 0,
    pressingDown: false,
    pressingUp: false,
    pressingLeft: false,
    pressingRight: false,
    aimAngle: 0,
  };

  if (_id == "player") player = properties;
  else unitList[_id] = properties;
};

upgrade = function (_id, _x, _y, _spdX, _spdY, _color, _category) {
  var properties = {
    id: _id,
    x: _x,
    y: _y,
    spdX: _spdX,
    spdY: _spdY,
    width: unitWidth,
    height: unitHeight,
    hp: unitStartHP,
    color: _color,
    category: _category,
  };

  upgradeList[_id] = properties;
};

bullet = function (_id, _x, _y, _spdX, _spdY) {
  var properties = {
    id: _id,
    x: _x,
    y: _y,
    spdX: _spdX,
    spdY: _spdY,
    width: unitWidth / 2,
    height: unitHeight / 2,
    hp: unitStartHP,
    color: "white",
    timer: 0,
  };

  bulletList[_id] = properties;
};

randomlyGenerateBullet = function (actor, overwriteangle) {
  var _id = Math.random();

  var _x = actor.x;
  var _y = actor.y;

  var angle = actor.aimAngle;

  if (overwriteangle !== undefined) {
    angle = overwriteangle;
  }

  //Math.random() * 360;
  angle = (angle / 180) * Math.PI;

  var _spdX = Math.cos(angle) * 5;
  var _spdY = Math.sin(angle) * 5;

  bullet(_id, _x, _y, _spdX, _spdY);
};

randomlyGenerateUpgrade = function () {
  var _id = Math.random();

  var _x = Math.random() * WIDTH;
  var _y = Math.random() * HEIGHT;

  var _spdX = 0;
  var _spdY = 0;
  var _category = {};
  var _color = {};

  if (Math.random() < 0.5) {
    _category = upgradeCategory[0];
    _color = "orange";
  } else {
    _category = upgradeCategory[1];
    _color = "purple";
  }

  upgrade(_id, _x, _y, _spdX, _spdY, _color, _category);
};

rectCollision = function (rect1, rect2) {
  return (
    rect1.x <= rect2.x + rect2.width &&
    rect2.x <= rect1.x + rect1.width &&
    rect1.y <= rect2.y + rect2.height &&
    rect2.y <= rect1.y + rect1.height
  );
};

distanceBetween = function (unit1, unit2) {
  var vx = unit1.x - unit2.x;
  var vy = unit1.y - unit2.y;
  return Math.sqrt(vx * vx + vy * vy);
};

updateEntity = function (entity) {
  updateEntityPosition(entity);
  drawEntity(entity);
};

updateEntityPosition = function (entity) {
  entity.x += entity.spdX;
  entity.y += entity.spdY;

  if (entity.x >= WIDTH || entity.x <= 0) {
    entity.spdX = -entity.spdX;
  }

  if (entity.y >= HEIGHT || entity.y <= 0) {
    entity.spdY = -entity.spdY;
  }
};

drawEntity = function (entity) {
  ctx.save();
  ctx.fillStyle = entity.color;
  ctx.fillRect(
    entity.x - entity.width / 2,
    entity.y - entity.height / 2,
    entity.width,
    entity.height
  );
  ctx.restore();
};

drawEntity = function (entity) {
  ctx.save();
  ctx.fillStyle = entity.color;
  ctx.fillRect(
    entity.x - entity.width / 2,
    entity.y - entity.height / 2,
    entity.width,
    entity.height
  );
  ctx.restore();
};

startGame = function () {
  //RESET EVERYTHING
  timeGameStarted = Date.now();

  numOfEnemys = 0;
  frameCount = 0;
  score = 0;
  counter = 0;

  //reset the units
  bulletList = {};
  upgradeList = {};
  unitList = {};
  unitCreator(3);

  unit("player", x, y, spdX, spdY, "green", 1);

  //reset players startHP
  player.hp = unitStartHP;
};

document.onclick = function (event) {
  //NEW BULLET
  if (player.atkCounter > 25) {
    randomlyGenerateBullet(player);
    player.atkCounter = 0;
  }
};

document.oncontextmenu = function (event) {
  //NEW BULLET
  if (player.atkCounter > 50) {
    //circle shot
    var angle = 0;
    while (angle < 360) {
      randomlyGenerateBullet(player, angle);
      angle++;
    }

    ///brust shot
    // randomlyGenerateBullet(player, player.aimAngle - 5);
    // randomlyGenerateBullet(player, player.aimAngle);
    // randomlyGenerateBullet(player, player.aimAngle + 5);

    player.atkCounter = 0;
  }

  //prevent the right click to open a menu
  event.preventDefault();
};

document.onmousemove = function (event) {
  var mouseX =
    event.clientX - document.getElementById("ctx").getBoundingClientRect().left;
  var mouseY =
    event.clientY - document.getElementById("ctx").getBoundingClientRect().top;

  mouseX -= player.x;
  mouseY -= player.y;

  player.aimAngle = (Math.atan2(mouseY, mouseX) / Math.PI) * 180;
};

document.onkeydown = function (event) {
  if (event.keyCode === 68)
    // d RIGHT
    player.pressingRight = true;
  if (event.keyCode === 83)
    // d RIGHT
    player.pressingDown = true;
  if (event.keyCode === 65)
    // a LEFT
    player.pressingLeft = true;
  if (event.keyCode === 87)
    // w UP
    player.pressingUp = true;
};

document.onkeyup = function (event) {
  if (event.keyCode === 68)
    // d RIGHT
    player.pressingRight = false;
  if (event.keyCode === 83)
    // d RIGHT
    player.pressingDown = false;
  if (event.keyCode === 65)
    // a LEFT
    player.pressingLeft = false;
  if (event.keyCode === 87)
    // w UP
    player.pressingUp = false;
};

updatePlayerPosition = function () {
  //UPDATES THE PLAYER POSITION, MOVES IT

  //MOVE UP
  if (player.pressingUp) {
    player.y -= player.height;
  }

  //MOVE DOWN
  if (player.pressingDown) {
    player.y += player.height;
  }

  //MOVE RIGHT
  if (player.pressingRight) {
    player.x += player.width;
  }

  //MOVE LEFT
  if (player.pressingLeft) {
    player.x -= player.width;
  }

  if (player.x < player.width / 2) {
    player.x = player.width / 2;
  } else if (player.x > WIDTH - player.width / 2) {
    player.x = WIDTH - player.width / 2;
  }

  if (player.y < player.height / 2) {
    player.y = player.height / 2;
  } else if (player.y > HEIGHT - player.height / 2) {
    player.y = HEIGHT - player.height / 2;
  }
};

function update() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  frameCount++;
  score++;
  player.atkCounter += player.atkSpd;

  //NEW ENEMY
  if (frameCount % 100 === 0) {
    unitCreator(1);
  }

  //NEW UPGRADE
  if (frameCount % 75 === 0) {
    randomlyGenerateUpgrade();
  }

  //BULLET DRAW AND COLLISION
  for (var key in bulletList) {
    updateEntity(bulletList[key]);
    bulletList[key].timer++;
    if (bulletList[key].timer > 75) {
      delete bulletList[key];
      continue;
    }

    //ENEMY DRAW AND COLLISION
    for (var key2 in unitList) {
      var isColliding = rectCollision(bulletList[key], unitList[key2]);

      if (isColliding) {
        delete bulletList[key];
        delete unitList[key2];
        //score += 100;
        break;
      }
    }
  }

  //UPGRADE DRAW AND COLLISION
  for (var key in upgradeList) {
    updateEntity(upgradeList[key]);

    var isColliding = rectCollision(player, upgradeList[key]);

    if (isColliding) {
      if (upgradeList[key].category == upgradeCategory[0]) score += 100;
      else player.atkSpd += 0.3;

      //upgradeList[key] = {};
      delete upgradeList[key];
    }
  }

  //ENEMY DRAW AND COLLISION
  for (var key in unitList) {
    updateEntity(unitList[key]);
    var isColliding = rectCollision(player, unitList[key]);

    if (isColliding) {
      player.hp--;
    }
  }

  //DEATH
  if (player.hp <= 0) {
    var timeSurvived = (Date.now() - timeGameStarted) / 1000;
    console.log("Dead! You survived for " + timeSurvived + "s");

    startGame();
  }

  //DRAW PLAYER
  drawEntity(player);
  ctx.fillText("Hp " + player.hp, 0, 30);
  ctx.fillText("Score " + score, 200, 30);
  updatePlayerPosition();
}

unit("player", x, y, spdX, spdY, "green", 1);
unitCreator(3);

setInterval(update, 50);