var GF = GameFramework;
var player, background, enemies;

var prevtime = 0;
var enemiesNumber = 0;
var enemiesToRemove = [];

var updateObjects = function (time) {

  // Respond to inputs
  if (GF.getInput("up") || GF.getInput("space")) {
    text = "up";
    GF.player.setAcceleration(GF.getGravity().multiplyBy(-3));
  } else {
    text = "nothing";
    GF.player.setAcceleration(GF.getGravity());
  }
  inputSpan.innerHTML = text;
  fpsSpan.innerHTML = GF.getFPS();

  // Create the enemies
  if (time - prevtime > settings.newEnemyDelay) {
    prevtime = time;
    GF.pushObject({
    	enemies: new Enemy()
    });
  }

  GF.enemies.forEach(function (enemy, index) {
    if (enemy.isCollidingWith(player)) {
      GF.endGame();
    }
    if (enemy.isOffScreen()) {
      enemy.destroy();
    }
  });
}

window.onload = function init() {
	fpsSpan = document.querySelector("#fps span");
	inputSpan = document.querySelector("#inputStates span");

  GF.setCanvas(document.querySelector("#screamy"));
  GF.setUpdateObjectsFunction(updateObjects);
  GF.setInputListeners(['up','space']);

  GF.addObjects({
  	player: new Player(),
  	background: new Background(),
  	enemies: []
  });

  GF.startGame();
}