var GameFramework = (function ($) {
  GF.Vector(

  GF.getInput(
  GF.getGravity(
  GF.getFPS(

  GF.pushObject(
  GF.addObjects(

  GF.setCanvas(
  GF.setUpdateObjectsFunction(
  GF.setInputListeners(

  GF.startGame(
  GF.endGame(

  GF.enemies.forEach(

/*
  canvas = document.querySelector("#screamy");
  ctx = canvas.getContext('2d');
  width = canvas.width;
  height = canvas.height;
  minY = 21;
  maxY = height - 21;
  aG = Math.round(height * settings.aG);

  framework = new GameFramework();
  framework.setDrawFrame(drawFrame);
  framework.setInputListeners(['up','space']);
  framework.start();

  player = new Player({
    aY: aG
  }, ctx, framework);

  background = new Background({
    speedX: settings.bgSpeed
  }, ctx, framework);

  bricks = [];
*/





/*
  // Draw the thing
  ctx.clearRect(0, 0, width, height);

  // Draw the background
  background.drawFrame();

  // Draw the player
  player.drawFrame();

  // Draw the enemies
  enemies.forEach(function (enemy, index) {
    if (enemy.isCollidingWith(player)) {
      GF.endGame();
    }
    enemy.drawFrame();
    if (enemy.getCoordinates().right <= 0) {
      enemiesToRemove.push(index);
    }
  });

  // Remove the unwanted enemies
  enemiesToRemove.forEach(function (el) {
    enemies.splice(el, 1);
  });
  enemiesToRemove = [];
*/

  return $;
}(GameFramework));