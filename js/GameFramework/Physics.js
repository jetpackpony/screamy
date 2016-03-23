GameFramework = (function ($) {

  $.getGravity = function () {
    return new $.Vector(0, -1);
  };

  $.setGravity = function (new_gravity) {
    aG = Math.round(height * settings.aG);

  };

  return $;
}(GameFramework));