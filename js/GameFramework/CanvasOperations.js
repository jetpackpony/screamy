GameFramework = (function ($) {
  var canvas, ctx, width, height;

  $._drawFrame = function (time) {
    // Draw the thing
    ctx.clearRect(0, 0, width, height);

    // Draw the background
    background.drawFrame();

    // Draw the player
    player.drawFrame();

    // Draw the enemies
    enemies.forEach(function (enemy, index) {
      enemy.drawFrame();
    });
  };

  $.setCanvas = function (new_canvas) {
    canvas = new_canvas;
    ctx = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
  };

  $.getCanvas = function () {
    return canvas;
  };

  $.getCTX = function () {
    return ctx;
  };

  $.getDimensions = function () {
    return {
      height: height,
      width: width
    };
  };

  return $;
}(GameFramework));