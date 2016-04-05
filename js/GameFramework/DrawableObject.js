GameFramework = (function ($) {

  function DrawableObject () {
    this.position = new $.Vector(0, 0);
    this.acceleration = new $.Vector(0, 0);
    this.speed = new $.Vector(0, 0);
    this.spriteCollection = new SpriteCollection();
    this.exists = true;
  }
  $.DrawableObject = DrawableObject;

  DrawableObject.prototype.draw = function() {
    
  };

  DrawableObject.prototype.setSpeed = function(new_vector) {
    this.speed = new_vector;
  };

  DrawableObject.prototype.setAcceleration = function(new_vector) {
    this.acceleration = new_vector;
  };

  DrawableObject.prototype.setPosition = function() {
    
  };

  DrawableObject.prototype.isCollidingWith = function() {
    
  };

  DrawableObject.prototype.destroy = function() {
    
  };

  /**
   * Updates the coordinates of the object according to the speed and acceleration
   * @return {void}
   */
  DrawableObject.prototype.updateState = function() {
    var delta = $.getFrameDelta() / 1000;
    this.speed = this.speed.add(this.acceleration.multiplyBy(delta));
    this.position = this.position.add(this.speed.multiplyBy(delta));
  };

  function SpriteCollection() {

  }

  return $;
}(GameFramework));
