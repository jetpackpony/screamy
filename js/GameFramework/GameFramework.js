GameFramework = (function ($) {
  var updateObjects;
  var gameState = 'beforeStart';
  var gravity;

  var mainLoop = function (time) {
    $._countFrameDelta(time);
    $._countFPS(time);

    updateObjects(time);
    $._drawFrame(time);

    if (gameState == 'playing') {
      requestAnimationFrame(mainLoop);
    }
  };

  $.setUpdateObjectsFunction = function (update_objects) {
    updateObjects = update_objects;
  };

  $.startGame = function () {
    gameState = 'playing';
    requestAnimationFrame(mainLoop);
  };

  $.endGame = function () {
    gameState = 'finished';
  }

  return $;
}(GameFramework));