GameFramework = (function ($) {
  var updateObjects;
  var gameState = 'beforeStart';
  var gravity;
  var reqFrame;

  var mainLoop = function (time) {
    $._countFrameDelta(time);
    $._countFPS(time);

    updateObjects(time);
    $._updateObjectsState();

    $._drawFrame(time);

    if (gameState == 'playing') {
      reqFrame = requestAnimationFrame(mainLoop);
    }
  };

  $.setUpdateObjectsFunction = function (update_objects) {
    updateObjects = update_objects;
    return $;
  };

  $.startGame = function () {
    gameState = 'playing';
    reqFrame = requestAnimationFrame(mainLoop);
    return $;
  };

  $.endGame = function () {
    gameState = 'finished';
    cancelAnimationFrame(reqFrame);
    return $;
  };

  return $;
}(GameFramework));