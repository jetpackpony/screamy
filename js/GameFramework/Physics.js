GameFramework = (function ($) {

  /**
   * Returns the current gravity vector
   * @return {Vector} the current gravity vector
   */
  $.getGravity = function () {
    return new $.Vector(0, -1);
  };

  /**
   * Sets the current gravity vector
   * @param {Vector} new_gravity new gravity vector
   */
  $.setGravity = function (new_gravity) {
    aG = Math.round(height * settings.aG);
    return $;
  };

  return $;
}(GameFramework));