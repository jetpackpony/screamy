GameFramework = (function ($) {
  var lastSecondFrameTime = 0;
  var fps = 0;
  var fpsCounter = 0;
  var frameDelta = 0;
  var prevFrameTime = 0;
  var firstFrame = true;

  $._countFPS = function (time) {
    if (time - lastSecondFrameTime > 1000) {
      lastSecondFrameTime = time;
      fps = fpsCounter;
      fpsCounter = 0;
    }
    fpsCounter++;
  };

  $._countFrameDelta = function (time) {
    if (firstFrame) {
      firstFrame = false;
      prevFrameTime = time;
    }
    frameDelta = time - prevFrameTime;
    prevFrameTime = time;
  };

  $.getFPS = function () {
    return fps;
  };

  $.getFrameDelta = function () {
    return frameDelta;
  };

  return $;
}(GameFramework));