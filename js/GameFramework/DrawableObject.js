GameFramework = (function ($) {

  /**
   * Class representing a game object which can be drawn on a canvas
   */
  function DrawableObject () {
    this._init();
  }
  $.DrawableObject = DrawableObject;

  /**
   * Initializes the object
   * @return {DrawableObject} this 
   */
  DrawableObject.prototype._init = function() {
    this.position = new $.Vector(0, 0);
    this.acceleration = new $.Vector(0, 0);
    this.speed = new $.Vector(0, 0);
    this.sprite = undefined;
    this.exists = true;
    this.name = "";
    this.staysOnCanvas = false;
    return this;
  };

  /**
   * Records the name of the object. Used by GF to store the object's name in the collection
   * @param {String} new_name the name of the object
   * @return {DrawableObject} this
   */
  DrawableObject.prototype._setName = function(new_name) {
    this.name = new_name;
    return this;
  };

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

  /**
   * Nulls the object and sets it up for removal from the collections
   * @return {void}
   */
  DrawableObject.prototype.destroy = function() {
    this._init();
    this.exists = false;
    $._clearDestroyedObjects();
  };

  /** 
   * Returns true if the object is not destroyed
   * @return {Boolean} true if the object is not destroyed
   */
  DrawableObject.prototype.isAlive = function() {
    return this.exists;
  };

  /**
   * Updates the coordinates of the object according to the speed and acceleration
   * @return {DrawableObject} this
   */
  DrawableObject.prototype.updateState = function() {
    var delta = $.getFrameDelta() / 1000,
        old_position;
    this.speed = this.speed.add(this.acceleration.multiplyBy(delta));
    old_position = this.position;
    this.position = this.position.add(this.speed.multiplyBy(delta));
    if (this.staysOnCanvas && (this.isOffScreen() || this.isTouchingAnyBorder())) {
      this.position = old_position;
      this.stop();
    }
    return this;
  };

  /**
   * Returns true if the object is completely off screen, false otherwise
   * @return {Boolean} true if the object is completely off screen, false otherwise
   */
  DrawableObject.prototype.isOffScreen = function() {
    return !this.getPolygon().isCollidingWith($.getScreenPolygon());
  };

  /**
   * Checks if the object is touching any border of the canvas
   * @return {Boolean} true if the object is touching any border
   */
  DrawableObject.prototype.isTouchingAnyBorder = function() {
    return this.isTouchingBottomBorder() || this.isTouchingTopBorder();
  };

  /**
   * Checks if the object is touching the bottom border of the canvas
   * @return {Boolean} true if the object is touching bottom border
   */
  DrawableObject.prototype.isTouchingBottomBorder = function() {
    return this._isTouchingBorder("bottom");
  };

  /**
   * Checks if the object is touching the top border of the canvas
   * @return {Boolean} true if the object is touching top border
   */
  DrawableObject.prototype.isTouchingTopBorder = function() {
    return this._isTouchingBorder("top");
  };

  /**
   * Checks if the object is touching the specified border of the canvas
   * @param  {String}  border the name of the border to check against
   * @return {Boolean}        true if the object is touching the border
   */
  DrawableObject.prototype._isTouchingBorder = function(border) {
    var borderPolygon,
        w = $.getDimensions().width,
        h = $.getDimensions().height;
    switch (border) {
      case "bottom":
        borderPolygon = $.Polygon.CreateNewFromPoints([0, h], [w, h], [0, h + 1], [w, h + 1]);
        break;
      case "top":
        borderPolygon = $.Polygon.CreateNewFromPoints([0, 0], [w, 0], [0, -1], [w, -1]);
        break;
    }
    return borderPolygon.isCollidingWith(this.getPolygon());
  };

  /**
   * Stops the object in its place
   * @return {DrawableObject} this
   */
  DrawableObject.prototype.stop = function() {
    this.setSpeed(new $.Vector(0, 0));
    this.setAcceleration(new $.Vector(0, 0));
  };

  /**
   * Sets the object to stay on canvas
   * @param {Boolean} isStaysOnCanvas true for the object to always stay on canvas
   */
  DrawableObject.prototype.setStaysOnCanvas = function(isStaysOnCanvas) {
    this.staysOnCanvas = isStaysOnCanvas;
  };

  return $;
}(GameFramework));
