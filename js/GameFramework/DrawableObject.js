GameFramework = (function ($) {

  /**
   * Class representing a game object which can be drawn on a canvas
   */
  function DrawableObject () {
    this.position = new $.Vector(0, 0);
    this.acceleration = new $.Vector(0, 0);
    this.speed = new $.Vector(0, 0);
    this.sprite = undefined;
    this.exists = true;
  }
  $.DrawableObject = DrawableObject;

  /**
   * Draws the currect state of the object at the current position
   * @return {void}
   */
  DrawableObject.prototype.draw = function() {
    if (this.sprite) 
      this.sprite.drawAt(this.position);
  };

  /**
   * Setter for speed
   * @param {Vector} new_vector the new speed
   * @return {DrawableObject} this
   */
  DrawableObject.prototype.setSpeed = function(new_vector) {
    this.speed = new_vector;
    return this;
  };

  /**
   * Setter for the acceleration
   * @param {Vector} new_vector the new acceleration
   * @return {DrawableObject} this
   */
  DrawableObject.prototype.setAcceleration = function(new_vector) {
    this.acceleration = new_vector;
    return this;
  };

  /**
   * Setter for the position of an object
   * @param {Vector} new_vector the new position
   * @return {DrawableObject} this
   */
  DrawableObject.prototype.setPosition = function(new_vector) {
    this.position = new_vector;
    return this;
  };

  /**
   * Setter for sprite collection of the game object
   * @param {Sprite} new_sprite the new sprite collection
   * @return {DrawableObject} this
   */
  DrawableObject.prototype.setSprite = function(new_sprite) {
    this.sprite = new_sprite;
    return this;
  };

  /**
   * Checks if the object colliding with another object
   * @param {DrawableObject} other the object to test collision with
   * @return {Boolean} true if objects are colliding or touching, false otherwise
   */
  DrawableObject.prototype.isCollidingWith = function(other) {
    return this.getPolygon().isCollidingWith(other.getPolygon());
  };

  /**
   * Returns the polygon of the current frame of an object
   * @return {Polygon} the polygon of the current frame of an object
   */
  DrawableObject.prototype.getPolygon = function() {
    return this.sprite.getCurrentPolygon().setCenter(this.position);
  };

  DrawableObject.prototype.destroy = function() {
    
  };

  /**
   * Updates the coordinates of the object according to the speed and acceleration
   * @return {DrawableObject} this
   */
  DrawableObject.prototype.updateState = function() {
    var delta = $.getFrameDelta() / 1000;
    this.speed = this.speed.add(this.acceleration.multiplyBy(delta));
    this.position = this.position.add(this.speed.multiplyBy(delta));
    return this;
  };

  return $;
}(GameFramework));
