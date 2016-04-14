GameFramework = (function ($) {

  var gravityConstant = 0.2, realGravity;

  /**
   * Returns the current gravity vector
   * @return {Vector} the current gravity vector
   */
  $.getGravity = function () {
    if (!realGravity) {
      realGravity = new $.Vector(0, Math.round($.getDimensions().height * gravityConstant));
    }
    return realGravity;
  };

  /**
   * Sets the current gravity vector
   * @param {float} new_const new gravity constant
   */
  $.setGravity = function (new_const) {
    gravityConstant = new_const;
    return $;
  };

  return $;
}(GameFramework));